import type { NeonQueryFunction } from '@neondatabase/serverless';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';

import 'dotenv/config';

import { env } from '@/lib/env/server';

const runSeeding = async () => {
	const sql: NeonQueryFunction<boolean, boolean> = neon(env.DATABASE_URL);
	const db = drizzle(sql);

	console.log('⏳ Seeding database...');

	const start = Date.now();

	// await migrate(db, { migrationsFolder: './migrations' });

	const end = Date.now();

	console.log('✅ Seeding completed in', end - start, 'ms');

	process.exit(0);
};

runSeeding().catch((err) => {
	console.error('❌ Seeding failed');
	console.error(err);
	process.exit(1);
});
