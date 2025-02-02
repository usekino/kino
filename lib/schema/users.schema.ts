import type { BuildRefine } from 'node_modules/drizzle-zod/schema.types.internal.d.ts';
import type { SchemaObject } from './_shared';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { users } from '@/lib/db/tables/auth/users.table';

import { immutableColumns } from './_shared';

const refineSchema = {
	username: (username) => username.min(3).max(100),
	email: (email) => email.email(),
	name: (name) => name.max(255),
	bio: (bio) => bio.max(450).optional(),
	updates: (updates) => updates.min(0),
	avatar: (avatar) => avatar.url().optional(),
} satisfies BuildRefine<typeof users>;

export const usersSchema = {
	create: createInsertSchema(users, refineSchema).omit({
		...immutableColumns,
		privateId: true,
		emailVerifiedAt: true,
		latestAgreement: true,
	}),
	read: createSelectSchema(users, refineSchema).omit({
		privateId: true,
	}),
	update: createInsertSchema(users, refineSchema).pick({
		username: true,
		email: true,
		name: true,
		emailVerifiedAt: true,
	}),
	delete: createSelectSchema(users, refineSchema).pick({ id: true }),
	seed: createInsertSchema(users, refineSchema).omit({
		privateId: true,
		latestAgreement: true,
		updates: true,
	}),
};

export type UsersSchema = SchemaObject<typeof usersSchema>;
