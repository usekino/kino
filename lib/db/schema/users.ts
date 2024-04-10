import { relations, sql } from 'drizzle-orm';
import { index, integer, json, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { schemaDefaults } from './_shared';
import { authentications } from './authentications';
import { sessions } from './sessions';

export const users = pgTable(
	'users',
	{
		id: varchar('id', { length: 255 }).unique().default(schemaDefaults.id).notNull().primaryKey(),
		createdAt: timestamp('created_at').default(schemaDefaults.currentTimestamp).notNull(),
		updatedAt: timestamp('updated_at').default(schemaDefaults.currentTimestamp).notNull(),
		deletedAt: timestamp('deleted_at'),
		updates: integer('updates').default(0).notNull(),
		username: varchar('username', { length: 255 }).notNull().unique('username_unique'),
		email: varchar('email', { length: 255 }).notNull().unique('email_unique'),
		emailVerifiedAt: timestamp('email_verified_at')
			.default(sql`null`)
			.$type<Date | null>(),
		avatar: varchar('avatar', { length: 255 }),
		bio: varchar('bio', { length: 3072 }),
		name: varchar('name', { length: 255 }),
		roles: json('roles')
			.default(sql`'["member"]'`)
			.notNull(),
		latestAgreement: timestamp('latest_terms')
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		hashedPassword: varchar('TEMPORARY_hashed_password', { length: 255 }).notNull(),
	},
	(table) => {
		return {
			idIdx: index('user_id_idx').on(table.id),
			usernameIdx: index('user_username_idx').on(table.username),
		};
	}
);

//
// Relations
export const userRelations = relations(users, ({ many, one }) => ({
	auth: one(authentications, {
		fields: [users.id],
		references: [authentications.userId],
	}),
	sessions: many(sessions),
}));

export type UserSchema = typeof users.$inferSelect;
