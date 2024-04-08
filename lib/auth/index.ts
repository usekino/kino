import { cache } from "react";
import { Session, User } from "lucia";
import { cookies } from "next/headers";

import { lucia } from "@/lib/auth/lucia";

export const validateAuthRequest = cache(
	async (): Promise<
		{ user: User; session: Session } | { user: null; session: null }
	> => {
		"use server";

		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
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

				console.log("Cookie validated: ", sessionCookie);

				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes
				);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();

				console.log("Cookie blank: ", sessionCookie);

				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes
				);
			}
		} catch {
			// We know this will throw when Next attempts to set the cookie while
			// rendering the page.
		}
		return result;
	}
);

// export const getUser = async () => {
// 	const { user } = await validateAuthRequest();
// 	return user;
// };

// export const getSession = async () => {
// 	const { session } = await validateAuthRequest();
// 	return session;
// };
