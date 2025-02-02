import type { BuildRefine } from 'node_modules/drizzle-zod/schema.types.internal.d.ts';
import type { SchemaObject } from './_shared';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { authentications } from '@/lib/db/tables/auth/authentications.table';
import { usersSchema } from '@/lib/schema/users.schema';

import { immutableColumns } from './_shared';

const refineSchema = {
	hashedPassword: (hashedPassword) => hashedPassword.min(8).max(100),
} satisfies BuildRefine<typeof authentications>;

const crudSchema = {
	create: createInsertSchema(authentications, refineSchema).pick(immutableColumns),
	read: createSelectSchema(authentications, refineSchema),
	update: createInsertSchema(authentications, refineSchema).pick(immutableColumns),
	delete: createInsertSchema(authentications, refineSchema).pick({ id: true }),
	seed: createInsertSchema(authentications, refineSchema),
};

export const authSchema = {
	...crudSchema,
	signUpEmail: z.object({
		email: usersSchema.read.shape.email,
		confirmEmail: usersSchema.read.shape.email,
		username: usersSchema.read.shape.username,
		password: crudSchema.read.shape.hashedPassword.unwrap(),
		confirmPassword: crudSchema.read.shape.hashedPassword.unwrap(),
		inviteCode: z.string().optional(),
	}),
	signInEmail: z.object({
		email: usersSchema.read.shape.email,
		password: crudSchema.read.shape.hashedPassword.unwrap(),
	}),
};

export type AuthSchema = SchemaObject<typeof authSchema>;
