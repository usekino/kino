import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

import { env as shared } from '@/lib/env/shared';

export const env = createEnv({
	extends: [shared],
	client: {},
	experimental__runtimeEnv: {},
	isServer: typeof window === 'undefined',
});
