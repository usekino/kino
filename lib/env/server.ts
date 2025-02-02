import { vercel } from '@t3-oss/env-core/presets-zod';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	extends: [vercel()],
	client: {
		// Project
		NEXT_PUBLIC_ROOT_DOMAIN: z.string().min(1),
		NEXT_PUBLIC_LOGGER_RESULT_LENGTH: z.coerce.number().int().min(0).optional(),
	},
	server: {
		DATABASE_URL: z.string().url().min(1),
		// Resend
		RESEND_API_KEY: z.string().min(1),
		RESEND_TEST_ADDRESS: z.string().email().optional(),
		// Upstash
		UPSTASH_REDIS_REST_URL: z.string().min(1),
		UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_ROOT_DOMAIN: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
		NEXT_PUBLIC_LOGGER_RESULT_LENGTH: process.env.NEXT_PUBLIC_LOGGER_RESULT_LENGTH,
	},
	isServer: typeof window === 'undefined',
});
