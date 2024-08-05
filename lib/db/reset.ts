import { sql } from 'drizzle-orm';

import { httpDb } from '.';

export const reset = async () => {
	console.log('⏳ Resetting database...');

	const start = Date.now();

	const query = sql<string>`SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE';
    `;

	const result = await httpDb.execute(query);
	const tables = result.rows;

	for (let table of tables) {
		const query = sql.raw(`TRUNCATE TABLE ${table.table_name} CASCADE;`);
		await httpDb.execute(query);
	}

	const end = Date.now();

	console.log('✅ Resetting completed in', end - start, 'ms');

	process.exit(0);
};

reset().catch((err) => {
	console.error('❌ Resetting failed');
	console.error(err);
	process.exit(1);
});
