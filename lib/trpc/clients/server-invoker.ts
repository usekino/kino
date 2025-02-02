import type { NextRequest } from 'next/server';

import { cache } from 'react';
import * as H from 'next/headers';

import { validateAuthRequest } from '@/lib/auth/utils';
import { createInnerTRPCContext } from '@/lib/trpc/context';
import { appRouter } from '@/lib/trpc/routers/_app';
import { t } from '@/lib/trpc/trpc';

const createContext = cache(async () => {
	const headers = await H.headers();
	const cookies = await H.cookies();

	const heads = new Headers(headers);
	heads.set('x-trpc-source', 'rsc');

	return {
		...createInnerTRPCContext({
			auth: await validateAuthRequest(),
		}),
		req: {} as NextRequest,
		headers: {
			cookie: cookies.toString(),
			'x-trpc-source': 'rsc-invoke',
		},
	};
});

const createCaller = t.createCallerFactory(appRouter);
export const api = createCaller(createContext, {
	onError: ({ error }) => {
		console.log('Error in tRPC server invoker');
		console.error(error);
	},
});
