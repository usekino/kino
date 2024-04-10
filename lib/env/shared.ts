import { vercel } from '@t3-oss/env-core/presets';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	extends: [vercel],
	shared: {
		// Project
		NEXT_PUBLIC_ROOT_DOMAIN: z.string().min(1),
		// Node
		NODE_ENV: z.enum(['development', 'production']),
		PORT: z.coerce.number().default(3000),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_ROOT_DOMAIN: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
		NODE_ENV: process.env.NODE_ENV,
		PORT: process.env.PORT,
	},
});
