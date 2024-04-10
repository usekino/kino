import 'dotenv/config';

import { defineConfig } from 'drizzle-kit';

import { env } from '@/lib/env/server';

export default defineConfig({
	dbCredentials: {
		connectionString: env.DATABASE_URL,
	},
	schema: './lib/db/schema',
	out: './drizzle',
	driver: 'pg',
	verbose: true,
});
