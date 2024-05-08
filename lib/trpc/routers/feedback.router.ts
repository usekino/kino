// import { feedback } from '@/lib/db/tables/feedback/feedback.table';
import { createFeedbackSchema } from '@/lib/schema/feedback.schema';
import { procedure, router } from '@/lib/trpc/trpc';

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
});
