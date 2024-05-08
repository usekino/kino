import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

import { env } from '@/lib/env/server';

import * as tables from './tables';

const connection = new Pool({ connectionString: env.DATABASE_URL });
export const db = drizzle(connection, {
	schema: tables,
});
