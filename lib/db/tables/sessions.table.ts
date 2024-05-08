import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { users } from './users.table';

// Note: this sessions table differs than the rest of the tables because it is
// managed by Lucia for sessions. AFAIK, this has specific requirements, that I
// won't really want to experiment with right now.

export const sessions = pgTable('sessions', {
	id: text('id').unique().primaryKey(),
	userId: text('user_id').notNull(),
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
