import 'dotenv/config';

import { defineConfig } from 'drizzle-kit';

import { env } from '@/lib/env/server';

export default defineConfig({
	dbCredentials: {
		connectionString: env.DATABASE_URL,
	},
	schema: './lib/db/tables/index.ts',
	out: './migrations',
	driver: 'pg',
	verbose: true,
});
