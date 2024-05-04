import { z } from 'zod';

import { mutateUserSchema, selectUserSchema } from '@/lib/db/schema/users-table';

export const updateUserSchema = z.object({
	username: mutateUserSchema.shape.username,
	email: mutateUserSchema.shape.email,
	name: mutateUserSchema.shape.name,
});
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;


export const readUserSchema = selectUserSchema.pick({
	id: true,
	username: true,
	email: true,
	name: true,
	role: true,
	latestAgreement: true,
});
export type ReadUserSchema = z.infer<typeof readUserSchema>;