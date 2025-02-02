import { TRPCError } from '@trpc/server';
import * as H from 'next/headers';
import { alphabet, generateRandomString } from 'oslo/crypto';
import { Argon2id } from 'oslo/password';

// import { generateEmailVerificationCode } from '@/lib/auth/codes/email-verification';
import { lucia } from '@/lib/auth/lucia';
import { authentications, mutateAuthSchema } from '@/lib/db/tables/auth/authentications.table';
import { users } from '@/lib/db/tables/auth/users.table';
import { env } from '@/lib/env/server';
import { authSchema } from '@/lib/schema/auth.schema';
import { usersSchema } from '@/lib/schema/users.schema';
import { noAuthProcedure } from '@/lib/trpc/procedures';
// import { sendAccountVerification } from '@/lib/email/template/sendAccountVerification';
import { router } from '@/lib/trpc/trpc';

import { isAuthed } from '../middleware/is-authed';

export const authRouter = router({
	signUpByEmail: noAuthProcedure.input(authSchema.signUpEmail).mutation(async ({ ctx, input }) => {
		return ctx.db.transaction(async (trx) => {
			const userId = generateRandomString(15, alphabet('a-z', 'A-Z', '0-9'));
			const hashedPassword = await new Argon2id().hash(input.password);
			const email = input.email.toLowerCase().trim();

			const newUser = usersSchema.create.parse({
				id: userId,
				email,
				username: input.username,
				role: ['beta', 'member'],
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

			const { sameSite, ...luciaAttr } = sessionCookie.attributes;

			const cookies = await H.cookies();

			cookies.set({
				...luciaAttr,
				name: sessionCookie.name,
				value: sessionCookie.value,
				domain: env.NEXT_PUBLIC_ROOT_DOMAIN,
				secure: process.env.NODE_ENV === 'production',
				sameSite: process.env.NODE_ENV === 'development' ? 'lax' : sameSite,
			});

			return {
				user: newUser,
			};
		});
	}),
	signInByEmail: noAuthProcedure.input(authSchema.signInEmail).mutation(async ({ ctx, input }) => {
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

		const { sameSite, ...luciaAttr } = sessionCookie.attributes;

		const cookies = await H.cookies();

		cookies.set({
			...luciaAttr,
			name: sessionCookie.name,
			value: sessionCookie.value,
			domain: env.NEXT_PUBLIC_ROOT_DOMAIN,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'development' ? 'lax' : sameSite,
		});

		return {
			user: existingUser,
		};
	}),
	signOut: noAuthProcedure.use(isAuthed).mutation(async ({ ctx }) => {
		await lucia.invalidateSession(ctx.auth.session.id);

		const cookies = await H.cookies();

		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

		return {};
	}),
});
