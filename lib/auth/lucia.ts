import type { SelectUserSchema } from '@/lib/db/schema/users';

import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { Lucia } from 'lucia';

import { db } from '@/lib/db/index';
import { sessions, users } from '@/lib/db/schema';

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: SelectUserSchema;
	}
}

export const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === 'production',
		},
	},
	getUserAttributes: (columns) => {
		return columns;
	},
});
