import 'server-only';

import { createTRPCProxyClient, loggerLink } from '@trpc/client';

//  import { getUserAuth } from "@/lib/auth/utils";
import { appRouter } from '@/lib/server/routers/_app';

export const api = createTRPCProxyClient<typeof appRouter>({
	links: [
		loggerLink({
			enabled: (op) =>
				process.env.NODE_ENV === 'development' ||
				(op.direction === 'down' && op.result instanceof Error),
		}),
	],
});
