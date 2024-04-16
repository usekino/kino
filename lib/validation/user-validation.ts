import { z } from 'zod';

import { mutateUserSchema } from '@/lib/db/schema/users-table';

export const updateUserSchema = z.object({
	username: mutateUserSchema.shape.username,
	email: mutateUserSchema.shape.email,
	name: mutateUserSchema.shape.name,
});
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
