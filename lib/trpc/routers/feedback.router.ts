import { feedback } from '@/lib/db/schema/feedback/feedback.table';
import { procedure, router } from '@/lib/trpc/trpc';
import { createFeedbackSchema } from '@/lib/validation/feedback.schema';

import { isAuthed } from '../middleware/is-authed';

export const feedbackRouter = router({
	create: procedure
		.use(isAuthed)
		.input(createFeedbackSchema)
		.mutation(async ({ ctx, input }) => {
			return ctx.db.transaction(async (trx) => {
				return await trx.insert(feedback).values({
					...input,
					userId: ctx.auth.user.id,
				});
			});
		}),
});
