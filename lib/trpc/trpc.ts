import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { type Context } from '@/lib/trpc/context';

import { isAuthed } from './middleware/is-authed';
import { consoleAuthPlugin } from './plugins/console-auth-plugin';

export const t = initTRPC.context<Context>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		};
	},
});

export const router = t.router;
