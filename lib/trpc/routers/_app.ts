import { router } from '@/lib/trpc/trpc';

import { authRouter } from './auth-router';
import { computersRouter } from './computers';

export const appRouter = router({
	computers: computersRouter,
	auth: authRouter,
});

export type AppRouter = typeof appRouter;
