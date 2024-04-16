import { getTeamData } from '@/lib/db/prepared';
import { xUsersTeams } from '@/lib/db/schema';
import { selectTeamSchema, teams } from '@/lib/db/schema/teams-table';
import { procedure, router } from '@/lib/trpc/trpc';
import { createTeamSchema } from '@/lib/validation/team-validation';

import { isAuthed } from '../middleware/is-authed';

export const teamRouter = router({
	findBySlug: procedure.input(selectTeamSchema.pick({ slug: true })).query(async ({ input }) => {
		const team = await getTeamData(input.slug);
		return team;
	}),
	create: procedure
		.use(isAuthed)
		.input(createTeamSchema)
		.mutation(async ({ ctx, input }) => {
			return ctx.db.transaction(async (trx) => {
				const ownerId = ctx.auth.user.id;
				const members = [ownerId];

				const res = await trx
					.insert(teams)
					.values({
						...input,
						ownerId,
						members,
					})
					.returning({
						id: teams.id,
					});

				await trx.insert(xUsersTeams).values({
					userId: ownerId,
					teamId: res[0].id,
				});

				return {
					success: true,
					data: { slug: input.slug },
				};
			});
		}),
});
