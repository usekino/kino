import { sql } from 'drizzle-orm';

export const schemaDefaults = {
	id: sql`LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0')`,
	currentTimestamp: sql`CURRENT_TIMESTAMP`,
};
