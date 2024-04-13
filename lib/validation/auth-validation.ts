import { z } from 'zod';

import { selectAuthSchema } from '@/lib/db/schema/authentications';
import { selectUserSchema } from '@/lib/db/schema/users';

export const signInEmailSchema = z.object({
	email: selectUserSchema.shape.email,
	password: selectAuthSchema.shape.hashedPassword.unwrap(),
});
export type SignInEmailSchema = z.infer<typeof signInEmailSchema>;

export const signUpEmailSchema = z
	.object({
		email: selectUserSchema.shape.email,
		confirmEmail: selectUserSchema.shape.email,
		username: selectUserSchema.shape.username,
		password: selectAuthSchema.shape.hashedPassword.unwrap(),
		confirmPassword: selectAuthSchema.shape.hashedPassword.unwrap(),
		inviteCode: z.string().optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: "Password don't match",
	})
	.refine((data) => data.email === data.confirmEmail, {
		path: ['confirmEmail'],
		message: "Email don't match",
	});
export type SignUpEmailSchema = z.infer<typeof signUpEmailSchema>;
