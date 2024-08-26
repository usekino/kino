import { eq, sql } from 'drizzle-orm';

import { users } from '@/lib/db/tables/users.table';
import { usersSchema } from '@/lib/schema/users.schema';
import { procedure, router } from '@/lib/trpc/trpc';

import { isAuthed } from '../middleware/is-authed';

export const userRouter = router({
	update: procedure
		.use(isAuthed)
		.input(usersSchema.update)
		.mutation(async ({ ctx, input }) => {
			return ctx.db.transaction(async (trx) => {
				await trx
					.update(users)
					.set({
						...input,
						updates: sql`updates + 1`,
					})
					.where(eq(users.id, ctx.auth.user.id));

				return {
					success: true,
				};
			});
		}),
});
