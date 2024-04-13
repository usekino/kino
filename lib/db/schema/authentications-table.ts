import { relations } from 'drizzle-orm';
import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema, Refine } from 'drizzle-zod';
import { z } from 'zod';

import { schemaDefaults } from './_shared';
import { users } from './users-table';

export const authentications = pgTable('authentications', {
	// Defaults
	id: varchar('id', { length: 255 }).unique().default(schemaDefaults.id).notNull().primaryKey(),
	createdAt: timestamp('created_at').default(schemaDefaults.currentTimestamp).notNull(),
	updatedAt: timestamp('updated_at').default(schemaDefaults.currentTimestamp).notNull(),
	deletedAt: timestamp('deleted_at'),
	updates: integer('updates').default(0).notNull(),
	//
	userId: varchar('user_id', {
		length: 255,
	}).notNull(),
	hashedPassword: varchar('hashed_password', {
		length: 255,
	}),
	githubId: varchar('github_id', { length: 255 }).unique(),
	googleId: varchar('google_id', { length: 255 }).unique(),
});

export const authenticationRelations = relations(authentications, ({ one }) => ({
	user: one(users, {
		fields: [authentications.userId],
		references: [users.id],
	}),
}));

const refineSchema = {
	hashedPassword: ({ hashedPassword }) => hashedPassword.min(8).max(100),
} satisfies Refine<typeof authentications, 'select'>;

export const selectAuthSchema = createSelectSchema(authentications, refineSchema);
export const mutateAuthSchema = createInsertSchema(authentications, refineSchema);

export type SelectAuthSchema = z.infer<typeof selectAuthSchema>;
export type CreateAuthSchema = z.infer<typeof mutateAuthSchema>;
