import { arrayContains } from 'drizzle-orm';

import { projectsByTeamSchema, readProjectSchema } from '@/lib/schema/project.schema';
import { readTeamSchema } from '@/lib/schema/team.schema';
import { procedure, router } from '@/lib/trpc/trpc';
import { createTruthyObject } from '@/lib/utils';

import { isAuthed } from '../middleware/is-authed';
import { getTeamProjectSelect, teamProjectSelect } from './lib/selectedTeamProject';

export const dashboardRouter = router({
	selected: procedure.use(isAuthed).query(async ({ ctx }) => {
		const { user } = ctx.auth;

		const selected = await getTeamProjectSelect
			.match({
				userId: user.id,
			})
			.then((result) => result[0]?.data ?? null);

		if (!selected) {
			await teamProjectSelect.set(user.id, {
				userId: user.id,
				team: {
					id: '', // fix this
					slug: '', // fix this
				},
			});
		}

		return selected;
	}),
	projectsByTeam: procedure
		.use(isAuthed)
		.input(projectsByTeamSchema)
		.query(async ({ ctx }) => {
			const { user } = ctx.auth;
			// Get teams where the user is a member
			const projectsByTeam = await ctx.db.query.xUsersTeams.findMany({
				columns: {},
				where: (table, { eq, and, or, not }) => {
					return and(
						eq(table.userId, user.id),
						or(
							arrayContains(table.userRole, ['admin']),
							arrayContains(table.userRole, ['member']) //
						),
						not(arrayContains(table.userRole, ['blocked']))
					);
				},
				with: {
					team: {
						columns: createTruthyObject(readTeamSchema.shape),
						with: {
							projects: {
								columns: createTruthyObject(readProjectSchema.shape),
							},
						},
					},
				},
			});

			const projects = projectsByTeam.map((pbt) => pbt.team);

			return projects;
		}),
	available: procedure.use(isAuthed).query(async ({ ctx }) => {
		const { user } = ctx.auth;

		// Get teams where the user is a member
		const userTeams = await ctx.db.query.xUsersTeams.findMany({
			columns: {},
			where: (table, { eq, and, or, not }) => {
				return and(
					eq(table.userId, user.id),
					or(
						arrayContains(table.userRole, ['admin']),
						arrayContains(table.userRole, ['member']) //
					),
					not(arrayContains(table.userRole, ['blocked']))
				);
			},
			with: {
				team: {
					columns: createTruthyObject(readTeamSchema.shape),
				},
			},
		});

		// ...throw if none found.
		// if (userTeams.length <= 0) {
		// 	throw new TRPCError({
		// 		code: 'NOT_FOUND',
		// 		message: 'Cannot find an authorized team for user',
		// 	});
		// }

		// Define teams
		const teams = userTeams.map((team) => readTeamSchema.parse(team.team));

		// Get projects where the user is a member
		const userProjects = await ctx.db.query.xUsersProjects.findMany({
			columns: {},
			where: (userProject, { eq, and, not, or }) => {
				return and(
					eq(userProject.userId, user.id),
					or(
						arrayContains(userProject.userRole, ['admin']),
						arrayContains(userProject.userRole, ['member']) //
					),
					not(arrayContains(userProject.userRole, ['blocked']))
				);
			},
			with: {
				project: {
					columns: createTruthyObject(readProjectSchema.shape),
				},
			},
		});
		// Define projects
		const projects = userProjects.map((project) => readProjectSchema.parse(project.project));

		return {
			teams,
			projects,
		};
	}),
});
