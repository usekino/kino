import { z } from 'zod';

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
	findByProject: procedure.input(z.object({ slug: z.string() })).query(async ({ input, ctx }) => {
		const data = await ctx.db.query.projects.findFirst({
			where: (table, { eq }) => eq(table.slug, input.slug),
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
		});

		return data
			? data.feedback.map((feedback) => {
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
				})
			: null;
	}),
});
