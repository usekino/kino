import { z } from 'zod';

import { createFeedbackSchema, selectFeedbackSchema } from '@/lib/schema/feedback/feedback.schema';
import { procedure, router } from '@/lib/trpc/trpc';
import { createTruthyObject } from '@/lib/utils';

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
	findByTeam: procedure.input(z.object({ slug: z.string() })).query(async ({ input, ctx }) => {
		const data = await ctx.db.query.feedback.findMany({
			where: (table, { eq }) => eq(table.teamId, input.slug),
			columns: createTruthyObject(selectFeedbackSchema.shape),
		});
		return data;
	}),
});
