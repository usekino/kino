import { relations } from 'drizzle-orm';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../_shared';
import { users } from './users.table';

export const emailVerifications = pgTable('email_verifications', {
	// Defaults
	...defaultColumns(),
	//
	code: varchar('code', {
		length: 255,
	}).notNull(),
	userId: varchar('user_id', {
		length: 255,
	})
		.notNull()
		.unique(),
	email: varchar('email', {
		length: 255,
	})
		.unique()
		.notNull(),
	expiresAt: timestamp('expires_at').notNull(),
});

export const emailVerificationCodeRelations = relations(emailVerifications, ({ one }) => ({
	user: one(users, {
		fields: [emailVerifications.userId],
		references: [users.id],
	}),
}));
