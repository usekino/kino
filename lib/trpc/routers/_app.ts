import type { TRPCClientErrorLike } from '@trpc/client';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import { router } from '@/lib/trpc/trpc';

import { authRouter } from './auth.router';
import { dashboardRouter } from './dashboard.router';
import { projectRouter } from './project.router';
import { teamRouter } from './team.router';
import { userRouter } from './user.router';

export const appRouter = router({
	auth: authRouter,
	user: userRouter,
	team: teamRouter,
	project: projectRouter,
	dashboard: dashboardRouter,
});

export type AppRouter = typeof appRouter;

export type TRPCClientError = TRPCClientErrorLike<AppRouter>;
export type API = {
	input: inferRouterInputs<AppRouter>;
	output: inferRouterOutputs<AppRouter>;
};
