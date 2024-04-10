import { vercel } from '@t3-oss/env-core/presets';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	extends: [vercel],
	server: {
		DATABASE_URL: z.string().url().min(1),
		RESEND_API_KEY: z.string().min(1),
	},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		RESEND_API_KEY: process.env.RESEND_API_KEY,
	},
	isServer: typeof window === 'undefined',
});
