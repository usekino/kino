import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { teamMembers, teams, users } from '@/lib/db/tables';
import { t } from '@/lib/trpc/trpc';

import { isAuthed } from '../middleware/is-authed';

export const consoleAuthPlugin = () => {
	return {
		isTeamMember: t.procedure
			.input(
				z.object({
					teamSlug: z.string(),
				})
			)
			.use(isAuthed)
			.use(async ({ ctx, next, input }) => {
				const data = await ctx.db
					.select({
						team: {
							id: teams.id,
							slug: teams.slug,
							name: teams.name,
						},
					})
					.from(teamMembers)
					.innerJoin(users, eq(users.id, teamMembers.userId))
					.innerJoin(teams, eq(teams.id, teamMembers.teamId))
					.where(
						and(
							eq(teamMembers.userId, ctx.auth.user.id),
							eq(teams.slug, input.teamSlug) //
						)
					);

				if (!data || data.length <= 0) {
					throw new TRPCError({
						code: 'FORBIDDEN',
						message: 'User is not authorized member of team',
					});
				}

				return next({
					ctx: {
						team: data[0].team,
					},
				});
			}),
	};
};
