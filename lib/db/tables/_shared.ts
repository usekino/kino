import { sql } from 'drizzle-orm';
import { integer, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const schemaDefaults = {
	randomId: sql`LPAD(LEFT(REPLACE(REPLACE(REPLACE(encode(convert_to(md5(random()::text), 'utf-8'), 'base64'), '/', ''), '+', ''), '=', ''), 15), 15, '0')`,
	currentTimestamp: sql`CURRENT_TIMESTAMP`,
};

export const defaultColumns = () => {
	return {
		autoId: serial('auto_id').notNull().primaryKey(),
		id: varchar('id', { length: 255 }).unique().default(schemaDefaults.randomId).notNull(),
		createdAt: timestamp('created_at').default(schemaDefaults.currentTimestamp).notNull(),
		updatedAt: timestamp('updated_at').default(schemaDefaults.currentTimestamp).notNull(),
		deletedAt: timestamp('deleted_at'),
		updates: integer('updates').default(0).notNull(),
	};
};
