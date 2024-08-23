import { TRPCError } from '@trpc/server';

import { getProjectData } from '@/lib/db/prepared';
import { selectProjectSchema } from '@/lib/db/tables/projects/projects.table';
import { createProjectSchema } from '@/lib/schema/project.schema';
import { procedure, router } from '@/lib/trpc/trpc';

import { isAuthed } from '../middleware/is-authed';

export const projectRouter = router({
	create: procedure
		.use(isAuthed)
		.input(createProjectSchema)
		.mutation(async ({ ctx, input }) => {
			const { user } = ctx.auth;

			return ctx.db.transaction(async (trx) => {
				// Check if the user is a member of the team
				const userTeam = await trx.query.teamUsers.findFirst({
					columns: {
						id: true,
						teamId: true,
					},
					where: (table, { eq, and }) =>
						and(
							eq(table.userId, user.id),
							eq(table.teamId, input.teamId)
							// arrayContains(table.userRole, ['admin'])
						),
					with: {
						team: {
							columns: {
								slug: true,
							},
						},
					},
				});

				// ...throw if not.
				if (!userTeam || !userTeam.id || !userTeam.team.slug) {
					throw new TRPCError({
						code: 'FORBIDDEN',
						message: `User is not authorized member of project's team.`,
					});
				}

				// ⚠️ ADD THIS BACK IN!!

				// Create the project
				// const newProject = await trx
				// 	.insert(projects)
				// 	.values({
				// 		...input,
				// 		teamId: userTeam.teamId,
				// 	})
				// 	.returning({
				// 		id: projects.id,
				// 		slug: projects.slug,
				// 	});

				// Add to join table
				// await trx.insert(xUsersProjects).values({
				// 	userId: user.id,
				// 	projectId: newProject[0].id,
				// 	userRole: ['member', 'admin'],
				// });

				// Return data
				return { projectSlug: input.slug, teamSlug: userTeam.team.slug };
			});
		}),
	findBySlug: procedure.input(selectProjectSchema.pick({ slug: true })).query(async ({ input }) => {
		return await getProjectData(input.slug);
	}),
	findByOwnership: procedure.use(isAuthed).query(async () => {
		// ⚠️ ADD THIS BACK IN (???)
		// const { user } = ctx.auth;
		// const projects = await ctx.db.query.xUsersProjects.findMany({
		// 	where: (userProject, { eq }) => eq(userProject.userId, user.id),
		// 	with: {
		// 		project: {
		// 			columns: createTruthy(readProjectSchema.shape),
		// 		},
		// 	},
		// });
		// const selected = await getTeamProjectSelect(user.id);
		// return {
		// 	projects: projects.map((project) => readProjectSchema.parse(project)),
		// 	selected,
		// };
	}),
});
