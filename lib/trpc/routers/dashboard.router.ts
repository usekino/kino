import { TRPCError } from '@trpc/server';

import { getUserProjectsByUserId } from '@/lib/db/prepared';
import { dashBoardSchema } from '@/lib/schema/dashboard.schema';
import { teamsSchema } from '@/lib/schema/teams/teams.schema';
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
		.input(dashBoardSchema.teamProjectSelect)
		.mutation(async ({ ctx, input }) => {
			// check if user is a part of the team
			const userTeam = await ctx.db.query.teamMembers.findFirst({
				columns: {
					id: true,
				},
				where: (table, { eq, and, or, not }) => {
					return and(
						eq(table.userId, ctx.auth.user.id),
						or(
							eq(table.userRole, 'admin'),
							eq(table.userRole, 'member') //
						),
						not(eq(table.userRole, 'blocked'))
					);
				},
			});

			if (!userTeam) {
				throw new TRPCError({
					code: 'FORBIDDEN',
					message: 'User is not authorized member of project&apos;s team.',
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
	userTeams: procedure.use(isAuthed).query(async ({ ctx }) => {
		const { user } = ctx.auth;
		return await ctx.db.query.teamMembers.findMany({
			columns: {},
			where: (table, { eq, and, or, not }) => {
				return and(
					eq(table.userId, user.id),
					or(
						eq(table.userRole, 'admin'),
						eq(table.userRole, 'member') //
					),
					not(eq(table.userRole, 'blocked'))
				);
			},
			with: {
				team: {
					columns: createTruthy(teamsSchema.read.shape),
				},
			},
		});
	}),
});
