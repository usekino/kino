import type { BuildRefine } from 'node_modules/drizzle-zod/schema.types.internal.d.ts';
import type { z } from 'zod';

import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { defaultColumns } from '../_shared';
import { users } from './users.table';

export const authentications = pgTable('authentications', {
	...defaultColumns(),
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
		relationName: 'users_authentications',
	}),
}));

const refineSchema = {
	hashedPassword: (hashedPassword) => hashedPassword.min(8).max(100),
} satisfies BuildRefine<typeof authentications>;

export const selectAuthSchema = createSelectSchema(authentications, refineSchema);
export const mutateAuthSchema = createInsertSchema(authentications, refineSchema);
export const seedAuthSchema = createInsertSchema(authentications, refineSchema);

export type SelectAuthSchema = z.infer<typeof selectAuthSchema>;
export type CreateAuthSchema = z.infer<typeof mutateAuthSchema>;
export type SeedAuthSchema = z.infer<typeof seedAuthSchema>;
