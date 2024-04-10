import { relations } from 'drizzle-orm';
import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { z } from 'zod';

import { schemaDefaults } from './_shared';
import { users } from './users';

export const authentications = pgTable('authentications', {
	id: varchar('id', { length: 255 }).unique().default(schemaDefaults.id).notNull().primaryKey(),
	createdAt: timestamp('created_at').default(schemaDefaults.currentTimestamp).notNull(),
	updatedAt: timestamp('updated_at').default(schemaDefaults.currentTimestamp).notNull(),
	deletedAt: timestamp('deleted_at'),
	updates: integer('updates').default(0).notNull(),
	userId: varchar('user_id', {
		length: 255,
	}).notNull(),
	hashedPassword: varchar('hashed_password', {
		length: 255,
	}),
	githubId: varchar('github_id', { length: 255 }).unique('github_id_unique'),
	googleId: varchar('google_id', { length: 255 }).unique('google_id_unique'),
});

export const authenticationRelations = relations(authentications, ({ one }) => ({
	user: one(users, {
		fields: [authentications.userId],
		references: [users.id],
	}),
}));

export const authenticationSchema = z.object({
	email: z.string().email().min(5).max(31),
	password: z
		.string()
		.min(4, { message: 'must be at least 4 characters long' })
		.max(15, { message: 'cannot be more than 15 characters long' }),
});

export const updateUserSchema = z.object({
	name: z.string().min(3).optional(),
	email: z.string().min(4).optional(),
});

export type UsernameAndPassword = z.infer<typeof authenticationSchema>;
