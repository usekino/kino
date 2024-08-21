import { z } from 'zod';

import { db } from '@/lib/db';
import { xUsersTeams } from '@/lib/db/tables/join/x-users-teams.table';
import { selectUserSchema } from '@/lib/db/tables/lucia/users.table';
import { createFeedbackSchema, selectFeedbackSchema } from '@/lib/schema/feedback/feedback.schema';
import { procedure, router } from '@/lib/trpc/trpc';
import { createTruthy } from '@/lib/utils';

import { isAuthed } from '../middleware/is-authed';

export const feedbackRouter = router({
	create: procedure
		.use(isAuthed)
		.input(createFeedbackSchema)
		.mutation(async ({ ctx }) => {
			return ctx.db.transaction(async () => {
				// return await trx.insert(feedback).values({
				// 	...input,
				// 	userId: ctx.auth.user.privateId,
				// });
			});
		}),
	byProject: procedure
		.use(isAuthed)
		.input(
			z.object({
				project: z.string(),
				board: z.string().optional(),
			})
		)
		.query(async ({ input, ctx }) => {
			const data = await ctx.db.query.projects.findFirst({
				where(table, { eq, and, inArray }) {
					return and(
						// 1. Check that project exits
						eq(table.slug, input.project),
						// 2. Check that user is a member of the project's team
						inArray(
							table.teamId,
							db
								.select({
									teamId: xUsersTeams.teamId,
								})
								.from(xUsersTeams)
								.where(
									and(
										eq(xUsersTeams.userId, ctx.auth.user.id),
										eq(xUsersTeams.teamId, table.teamId)
									)
								)
						)
					);
				},
				with: {
					boards: {
						where(table, { eq }) {
							if (input.board) {
								return eq(table.slug, input.board);
							}
						},
						with: {
							feedback: {
								columns: createTruthy(selectFeedbackSchema.shape),
								with: {
									userAssigned: {
										columns: createTruthy(selectUserSchema.shape),
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

			const test = data
				? data.boards
						.map((board) => {
							return board.feedback.map((feedback) => {
								const voteCount = feedback.votes.length;

								// Remove the votes, since we just want to count them
								const { votes, ...f } = feedback;

								const parsed = selectFeedbackSchema
									.merge(
										z.object({
											userAssigned: selectUserSchema.nullable(),
											votes: z.number(),
										})
									)
									.safeParse({
										...f,
										votes: voteCount,
									});

								// If there's an error, log it and throw an error
								if (parsed.error) {
									if (process.env.NODE_ENV === 'development') {
										console.log(parsed.error);
										throw new Error('Error parsing feedback: ', parsed.error);
									}
									throw new Error('Error parsing feedback');
								}

								// Return the parsed feedback
								return parsed.data;
							});
						})
						.flat()
				: null;

			return test;
		}),
});
