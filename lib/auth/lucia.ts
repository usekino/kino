import { Lucia } from "lucia";
import { db } from "@/lib/db/index";

import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { sessions, users } from "../db/schema/auth";
import { getBaseUrl } from "../utils";

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	email: string;
	name: string;
}

export const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production",
			domain: ".usekino.com",
		},
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			email: attributes.email,
			name: attributes.name,
		};
	},
});
