import { router } from '@/lib/trpc/trpc';

import { authRouter } from './auth-router';
import { computersRouter } from './computers';
import { teamRouter } from './team-router';
import { userRouter } from './user-router';

export const appRouter = router({
	computers: computersRouter,
	auth: authRouter,
	user: userRouter,
	team: teamRouter,
});

export type AppRouter = typeof appRouter;
