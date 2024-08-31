import { and, eq, exists, or } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/lib/db';
import { teamMembers, teams } from '@/lib/db/tables';
import { projectMembers } from '@/lib/db/tables/projects/project-members.table';
import { projects } from '@/lib/db/tables/projects/projects.table';
import { feedbackSchema } from '@/lib/schema/feedback/feedback.schema';
import { usersSchema } from '@/lib/schema/users.schema';
import { procedure, router } from '@/lib/trpc/trpc';
import { createTruthy } from '@/lib/utils';

import { isAuthed } from '../middleware/is-authed';

export const feedbackRouter = router({
	byProject: procedure
		.use(isAuthed)
		.input(
			z.object({
				project: z.string(),
				board: z.string().optional(),
			})
		)
		.query(async ({ ctx, input }) => {
			// const projects = await ctx.db.query.projects.findFirst({
			// 	where(projects, { eq, and, inArray }) {
			// 		return and(
			// 			// 1. Check that project exits
			// 			eq(projects.slug, input.project),
			// 			// 2. Check that user is a member of the project's team
			// 			inArray(
			// 				projects.teamId,
			// 				ctx.db
			// 					.select({
			// 						teamId: projectMembers.projectId,
			// 					})
			// 					.from(projectMembers)
			// 					.where(
			// 						and(
			// 							eq(projectMembers.userId, ctx.auth.user.id),
			// 							eq(projectMembers.projectId, projects.id) // TODO: check that this is correctly querying the correct teamMembers row(s)
			// 						)
			// 					)
			// 			)
			// 		);
			// 	},
			// 	with: {
			// 		boards: {
			// 			where(table, { eq }) {
			// 				if (input.board) {
			// 					return eq(table.slug, input.board);
			// 				}
			// 			},
			// 			with: {
			// 				feedback: {
			// 					columns: createTruthy(feedbackSchema.read.shape),
			// 					with: {
			// 						assignedUser: {
			// 							columns: createTruthy(usersSchema.read.shape),
			// 						},
			// 						votes: {
			// 							columns: {
			// 								id: true,
			// 							},
			// 						},
			// 					},
			// 				},
			// 			},
			// 		},
			// 	},
			// });

			// const data = await db
			// 	.select()
			// 	.from(projects)
			// 	.innerJoin(teams, eq(teams.id, projects.teamId))
			// 	.where(
			// 		and(
			// 			eq(projects.slug, input.project),
			// 			or(
			// 				exists(
			// 					db
			// 						.select()
			// 						.from(teamMembers)
			// 						.where(
			// 							and(
			// 								eq(teamMembers.userId, ctx.auth.user.id),
			// 								eq(teamMembers.teamId, teams.id),
			// 								eq(teamMembers.userRole, 'admin')
			// 							)
			// 						)
			// 				),
			// 				exists(
			// 					db
			// 						.select()
			// 						.from(projectMembers)
			// 						.where(
			// 							and(
			// 								eq(projectMembers.userId, ctx.auth.user.id),
			// 								eq(projectMembers.projectId, projects.id)
			// 							)
			// 						)
			// 				)
			// 			)
			// 		)
			// 	)
			// 	.limit(1);

			const data = await db.query.projects.findFirst({
				where: () =>
					and(
						eq(projects.slug, input.project),
						or(
							exists(
								db
									.select()
									.from(teamMembers)
									.innerJoin(teams, eq(teams.id, teamMembers.teamId))
									.where(
										and(
											eq(teamMembers.userId, ctx.auth.user.id),
											eq(teamMembers.teamId, teams.id),
											eq(teamMembers.userRole, 'admin')
										)
									)
							),
							exists(
								db
									.select()
									.from(projectMembers)
									.innerJoin(projects, eq(projects.id, projectMembers.projectId))
									.where(
										and(
											eq(projectMembers.userId, ctx.auth.user.id),
											eq(projectMembers.projectId, projects.id)
										)
									)
							)
						)
					),
				with: {
					boards: {
						where(table, { eq }) {
							if (input.board) {
								return eq(table.slug, input.board);
							}
						},
						with: {
							feedback: {
								columns: createTruthy(feedbackSchema.read.shape),
								with: {
									assignedUser: {
										columns: createTruthy(usersSchema.read.shape),
									},
									votes: {
										columns: {
											id: true,
										},
									},
								},
							},
						},
					},
				},
			});

			return data ?? 'No project found';
		}),
});
