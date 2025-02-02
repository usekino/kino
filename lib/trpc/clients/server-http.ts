import type { AppRouter } from '@/lib/trpc/routers/_app';

import {
	createTRPCClient,
	httpBatchLink,
	unstable_httpBatchStreamLink as httpBatchStreamLink,
	splitLink,
} from '@trpc/client';
import * as H from 'next/headers';
import superjson from 'superjson';

import { customLoggerLink, skipStream } from '@/lib/trpc/utils';
import { getBaseUrl } from '@/lib/utils/get-base-url';

const options = {
	transformer: superjson,
	url: `${getBaseUrl()}/api/trpc`,
	headers: async () => {
		const headers = new Headers(await H.headers());

		headers.delete('connection');
		headers.delete('transfer-encoding');
		headers.set('x-trpc-source', 'server');
		return Object.fromEntries(headers.entries());
	},
};

export const api = createTRPCClient<AppRouter>({
	links: [
		customLoggerLink(),
		splitLink({
			condition: skipStream,
			true: httpBatchLink(options),
			false: httpBatchStreamLink(options),
		}),
	],
});
