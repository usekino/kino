import { relations } from 'drizzle-orm';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { users } from './users.table';

// ⚠️ Note: this table differs from the rest of the non-auth tables
// because it's managed by Lucia, and it has specific requirements, on how
// the database it structured.

export const sessions = pgTable('sessions', {
	id: varchar('id', { length: 255 }).unique().primaryKey(),
	userId: varchar('user_id', { length: 255 }).notNull(),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date',
	}).notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id],
		relationName: 'sessions',
	}),
}));
