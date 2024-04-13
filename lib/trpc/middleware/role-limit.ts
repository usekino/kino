import type { User } from 'lucia';

import { TRPCError } from '@trpc/server';

import { t } from '@/lib/trpc/trpc';

type RoleLimitArgs = {
	allowedRoles: User['role'];
};

export const roleLimit = ({ allowedRoles }: RoleLimitArgs) => {
	return t.middleware(async ({ ctx, next }) => {
		if (!ctx.auth.session || !ctx.auth.user) {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: 'Not authenticated',
			});
		}

		const userRoles = ctx.auth.user.role;

		if (!userRoles.some((role) => allowedRoles.includes(role))) {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: 'Authenticated, but not allowed based on role',
			});
		}

		return next({ ctx });
	});
};
