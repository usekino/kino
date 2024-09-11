import type { TRPCClientErrorLike } from '@trpc/client';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import { router } from '@/lib/trpc/trpc';

import { authRouter } from './auth.router';
import { consoleRouter } from './console';
import { feedbackRouter } from './feedback.router';
import { projectRouter } from './project.router';
import { teamRouter } from './team.router';
import { userRouter } from './user.router';

export const appRouter = router({
	auth: authRouter,
	user: userRouter,
	team: teamRouter,
	project: projectRouter,
	feedback: feedbackRouter,
	console: consoleRouter,
});

export type AppRouter = typeof appRouter;

export type TRPCClientError = TRPCClientErrorLike<AppRouter>;
export type API = {
	input: inferRouterInputs<AppRouter>;
	output: inferRouterOutputs<AppRouter>;
};
