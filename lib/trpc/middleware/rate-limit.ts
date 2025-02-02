import type { NextRequest } from 'next/server';

import { TRPCError } from '@trpc/server';
import { Ratelimit } from '@upstash/ratelimit';
import { ipAddress } from '@vercel/functions';

import { redis } from '@/lib/db/upstash';
import { t } from '@/lib/trpc/trpc';

const getIPAddress = (request: NextRequest) => {
	if (process.env.NODE_ENV === 'development') {
		return 'local';
	}
	return (
		ipAddress(request) ||
		request.headers.get('x-real-ip') ||
		request.headers.get('x-forwarded-for') ||
		'unknown'
	);
};

type RateLimitArgs = {
	tokens?: Parameters<typeof Ratelimit.slidingWindow>[0];
	duration?: Parameters<typeof Ratelimit.slidingWindow>[1];
};

export const rateLimit = (args?: RateLimitArgs | undefined) => {
	const { tokens = 1, duration = '60 s' } = args || {
		tokens: 1,
		duration: '60 s',
	};

	const ratelimit = new Ratelimit({
		redis: redis,
		limiter: Ratelimit.slidingWindow(tokens, duration),
		analytics: true,
	});

	return t.middleware(async ({ ctx, path, next }) => {
		const ip = getIPAddress(ctx.req);

		if (ip !== 'local') {
			const identifier = `${path}-${ip}`;
			const result = await ratelimit.limit(identifier);

			if (!result.success) {
				throw new TRPCError({
					code: 'TOO_MANY_REQUESTS',
					message: JSON.stringify({
						limit: result.limit,
						remaining: result.remaining,
					}),
				});
			}
			console.log('ratelimit: ', {
				identifier,
				success: result.success,
				limit: result.limit,
				remaining: result.remaining,
			});
		}

		return next({
			ctx,
		});
	});
};
