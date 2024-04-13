import { router } from '@/lib/trpc/trpc';

import { authRouter } from './auth-router';
import { computersRouter } from './computers';
import { userRouter } from './user-router';

export const appRouter = router({
	computers: computersRouter,
	auth: authRouter,
	user: userRouter,
});

export type AppRouter = typeof appRouter;
