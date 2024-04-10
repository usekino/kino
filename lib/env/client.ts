import { vercel } from '@t3-oss/env-core/presets';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	extends: [vercel],
	client: {
		// Project
		NEXT_PUBLIC_ROOT_DOMAIN: z.string().min(1),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_ROOT_DOMAIN: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
	},
	isServer: typeof window === 'undefined',
});
