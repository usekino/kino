import { TRPCError } from '@trpc/server';
import { arrayContains } from 'drizzle-orm';

import { getUserProjectsByUserId } from '@/lib/db/prepared';
import { teamProjectSelectSchema } from '@/lib/schema/dashboard.schema';
import { readProjectSchema } from '@/lib/schema/project.schema';
import { selectTeamSchema } from '@/lib/schema/team.schema';
import { procedure, router } from '@/lib/trpc/trpc';
import { createTruthy } from '@/lib/utils';

import { isAuthed } from '../middleware/is-authed';
import { getTeamProjectSelect, teamProjectSelect } from './lib/selectedTeamProject';

export const dashboardRouter = router({
	selected: procedure.use(isAuthed).query(async ({ ctx }) => {
		return getTeamProjectSelect(ctx.auth.user.id);
	}),
	updateSelectedProject: procedure
		.use(isAuthed)
		.input(teamProjectSelectSchema)
		.mutation(async ({ ctx, input }) => {
			// check if user is a part of the team
			const userTeam = await ctx.db.query.xUsersTeams.findFirst({
				columns: {
					id: true,
				},
				where: (table, { eq, and, or, not }) => {
					return and(
						eq(table.userId, ctx.auth.user.id),
						or(
							arrayContains(table.userRole, ['admin']),
							arrayContains(table.userRole, ['member']) //
						),
						not(arrayContains(table.userRole, ['blocked']))
					);
				},
			});

			if (!userTeam) {
				throw new TRPCError({
					code: 'FORBIDDEN',
					message: `User is not authorized member of project's team.`,
				});
			}

			await teamProjectSelect.update(ctx.auth.user.id, input);

			return {
				success: true,
			};
		}),
	userProjects: procedure.use(isAuthed).query(async ({ ctx }) => {
		const { user } = ctx.auth;

		const userProjects = await getUserProjectsByUserId(user.id);
		const selected = await getTeamProjectSelect(user.id, {
			userId: user.id,
			id: userProjects[0].team.projects[0].id,
			slug: userProjects[0].team.projects[0].slug,
		});

		const projects = userProjects.map((pbt) => pbt.team);
		const containsProject = !!projects.find((project) => project.projects.length > 0);

		return {
			selected,
			projects,
			containsProject,
		};
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
					columns: createTruthy(selectTeamSchema.shape),
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
		const teams = userTeams.map((team) => selectTeamSchema.parse(team.team));

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
					columns: createTruthy(readProjectSchema.shape),
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
