import type { NeonQueryFunction } from '@neondatabase/serverless';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';

import 'dotenv/config';

import { env } from '@/lib/env/server';

const runMigrate = async () => {
	const sql: NeonQueryFunction<boolean, boolean> = neon(env.DATABASE_URL);
	const db = drizzle(sql);

	console.log('⏳ Running migrations...');

	const start = Date.now();

	await migrate(db, { migrationsFolder: './migrations' });

	const end = Date.now();

	console.log('✅ Migrations completed in', end - start, 'ms');

	process.exit(0);
};

runMigrate().catch((err) => {
	console.error('❌ Migration failed');
	console.error(err);
	process.exit(1);
});
