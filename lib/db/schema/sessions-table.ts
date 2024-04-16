import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

// import { createInsertSchema, createSelectSchema, Refine } from 'drizzle-zod';
// import { z } from 'zod';

import { users } from './users-table';

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

// const refineSchema = {} satisfies Refine<typeof sessions, 'select'>;

// export const selectSessionSchema = createSelectSchema(users, refineSchema);
// export const mutateSessionSchema = createInsertSchema(users, refineSchema);

// export type SelectSessionSchema = z.infer<typeof selectSessionSchema>;
// export type CreateSessionSchema = z.infer<typeof mutateSessionSchema>;
