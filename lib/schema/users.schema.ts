import type { Refine } from 'drizzle-zod';
import type { DBtoCRUD } from './_shared';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { users } from '@/lib/db/tables/users.table';

import { insertSchema, protectedColumns } from './_shared';

const refineSchema = {
	username: ({ username }) => username.min(3).max(100),
	email: ({ email }) => email.email(),
	name: ({ name }) => name.max(255),
	role: () => z.array(z.enum(['member', 'admin', 'beta'])),
	bio: ({ bio }) => bio.max(450),
	updates: ({ updates }) => updates.min(0),
	avatar: ({ avatar }) => avatar.url(),
} satisfies Refine<typeof users, 'select'>;

export const usersSchema = {
	// create: createInsertSchema(users, refineSchema).omit({
	// 	...protectedColumns,
	// 	privateId: true,
	// 	emailVerifiedAt: true,
	// 	latestAgreement: true,
	// }),
	create: insertSchema(users, refineSchema),
	read: createSelectSchema(users, refineSchema),
	update: createInsertSchema(users, refineSchema).pick({
		...protectedColumns,
		username: true,
		email: true,
		name: true,
		role: true,
		emailVerifiedAt: true,
	}),
	delete: createInsertSchema(users, refineSchema).pick({ id: true }),
	seed: createInsertSchema(users, refineSchema).omit({
		privateId: true,
		createdAt: true,
		updatedAt: true,
		latestAgreement: true,
	}),
};

export type UsersSchema = DBtoCRUD<typeof usersSchema>;

// export type UserSchema = {
// 	Read: z.infer<typeof userSchema.read>;
// 	Update: z.infer<typeof userSchema.update>;
// 	Create: z.infer<typeof userSchema.create>;
// 	Delete: z.infer<typeof userSchema.delete>;
// 	Seed: z.infer<typeof userSchema.seed>;
// };

// export const updateUserSchema = z.object({
// 	username: mutateUserSchema.shape.username,
// 	email: mutateUserSchema.shape.email,
// 	name: mutateUserSchema.shape.name,
// });
// export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

// export const readUserSchema = selectUserSchema.pick({
// 	id: true,
// 	username: true,
// 	email: true,
// 	name: true,
// 	role: true,
// 	latestAgreement: true,
// });
// export type ReadUserSchema = z.infer<typeof readUserSchema>;
