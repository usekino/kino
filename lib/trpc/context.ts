import type { Session, User } from 'lucia';
import type { NextRequest } from 'next/server';

import { validateAuthRequest } from '@/lib/auth/utils';
import { db } from '@/lib/db';

type CreateContextOptions = {
	auth:
		| {
				user: User;
				session: Session;
		  }
		| {
				user: null;
				session: null;
		  };
};

export const createInnerTRPCContext = (opts: CreateContextOptions) => {
	return {
		auth: opts.auth,
		db,
	};
};

export const createTRPCContext = async (opts: { req: NextRequest }) => {
	const auth = await validateAuthRequest();
	return {
		...createInnerTRPCContext({
			auth,
		}),
		req: opts.req,
		headers: opts && Object.fromEntries(opts.req.headers),
	};
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
