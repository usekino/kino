import { TRPCError } from '@trpc/server';
import { cookies } from 'next/headers';
import { alphabet, generateRandomString } from 'oslo/crypto';
import { Argon2id } from 'oslo/password';

// import { generateEmailVerificationCode } from '@/lib/auth/codes/email-verification';
import { lucia } from '@/lib/auth/lucia';
import { authentications, mutateAuthSchema } from '@/lib/db/schema/authentications-table';
import { mutateUserSchema, users } from '@/lib/db/schema/users-table';
import { env } from '@/lib/env/server';
// import { sendAccountVerification } from '@/lib/email/template/sendAccountVerification';
import { procedure, router } from '@/lib/trpc/trpc';
import { signInEmailSchema, signUpEmailSchema } from '@/lib/validation/auth-validation';

import { isAuthed } from '../middleware/is-authed';

export const authRouter = router({
	signUpByEmail: procedure.input(signUpEmailSchema).mutation(async ({ ctx, input }) => {
		return ctx.db.transaction(async (trx) => {
			const userId = generateRandomString(15, alphabet('a-z', 'A-Z', '0-9'));
			const hashedPassword = await new Argon2id().hash(input.password);
			const email = input.email.toLowerCase().trim();

			const newUser = mutateUserSchema.parse({
				id: userId,
				email,
				username: input.username,
				roles: ['beta', 'member'],
				verified: true, // TODO: change to false when set up RESEND
			});

			const newUserAuth = mutateAuthSchema.parse({
				userId,
				hashedPassword,
				githubId: null,
				googleId: null,
			});

			await trx.insert(users).values(newUser);
			await trx.insert(authentications).values(newUserAuth);

			// await sendAccountVerification({
			// 	code: await generateEmailVerificationCode(userId, newUser.email),
			// 	email: newUser.email,
			// 	username: newUser.username,
			// 	signUp: true,
			// });

			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);

			const { domain, secure, sameSite, ...rest } = sessionCookie.attributes;

			cookies().set({
				name: sessionCookie.name,
				value: sessionCookie.value,
				domain: env.NEXT_PUBLIC_ROOT_DOMAIN,
				secure: process.env.NODE_ENV === 'production',
				sameSite: process.env.NODE_ENV === 'development' ? 'lax' : sameSite,
				...rest,
			});

			return {
				user: newUser,
			};
		});
	}),
	signInByEmail: procedure.input(signInEmailSchema).mutation(async ({ ctx, input }) => {
		// TODO: implement transaction here
		const existingUser = await ctx.db.query.users.findFirst({
			where: (user, { eq }) => eq(user.email, input.email),
			with: {
				authentications: {
					columns: {
						hashedPassword: true,
					},
				},
			},
		});

		if (!existingUser || !existingUser.authentications?.hashedPassword) {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: 'Incorrect username or password',
			});
		}

		const validPassword = await new Argon2id().verify(
			existingUser.authentications.hashedPassword,
			input.password
		);

		if (!validPassword) {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: 'Incorrect email or password',
			});
		}

		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		const { domain, secure, sameSite, ...rest } = sessionCookie.attributes;

		cookies().set({
			name: sessionCookie.name,
			value: sessionCookie.value,
			domain: env.NEXT_PUBLIC_ROOT_DOMAIN,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'development' ? 'lax' : sameSite,
			...rest,
		});

		return {
			user: existingUser,
		};
	}),
	signOut: procedure.use(isAuthed).mutation(async ({ ctx }) => {
		await lucia.invalidateSession(ctx.auth.session.id);

		const sessionCookie = lucia.createBlankSessionCookie();
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

		return {};
	}),
});
