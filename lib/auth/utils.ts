import type { Session, User } from 'lucia';

import { cache } from 'react';
import * as H from 'next/headers';
import { redirect } from 'next/navigation';

import { lucia } from '@/lib/auth/lucia';

export const validateAuthRequest = cache(
	async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
		'use server';

		const cookies = await H.cookies();

		const sessionId = cookies.get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null,
			};
		}

		const result = await lucia.validateSession(sessionId);

		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);

				cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();

				cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
		} catch {
			// We know this will throw when Next attempts to set the cookie while
			// rendering the page.
		}
		return result;
	}
);

export const getUser = async () => {
	const { user } = await validateAuthRequest();
	return user;
};

export const getSession = async () => {
	const { session } = await validateAuthRequest();
	return session;
};

export const checkAuth = async () => {
	const session = await getSession();
	if (session === null) redirect('/sign-in');
};
