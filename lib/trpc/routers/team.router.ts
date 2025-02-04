import { getTeamData } from '@/lib/db/prepared';
import { teamMembers } from '@/lib/db/tables';
import { teams } from '@/lib/db/tables/teams/teams.table';
import { teamsSchema } from '@/lib/schema/teams/teams.schema';
import { noAuthProcedure } from '@/lib/trpc/procedures';
import { router } from '@/lib/trpc/trpc';
import { createTruthy, generateId } from '@/lib/utils';

import { isAuthed } from '../middleware/is-authed';

export const teamRouter = router({
	findBySlug: noAuthProcedure
		.input(teamsSchema.read.pick({ slug: true }))
		.query(async ({ input }) => {
			const team = await getTeamData(input.slug);
			return team;
		}),
	getUserTeams: noAuthProcedure.use(isAuthed).query(async ({ ctx }) => {
		const { user } = ctx.auth;

		const teams = await ctx.db.query.teamMembers.findMany({
			where: (userTables, { eq }) => eq(userTables.userId, user.id),
			columns: {},
			with: {
				team: {
					columns: createTruthy(teamsSchema.read.shape),
				},
			},
		});

		return {
			teams: teams.map(({ team }) => teamsSchema.read.parse(team)),
		};
	}),
	// findByOwnership: procedure.use(isAuthed).query(async ({ ctx }) => {
	// 	const { user } = ctx.auth;
	// 	const teams = await ctx.db.query.teams.findMany({
	// 		where: (table, { eq }) => eq(table.ownerId, user.id),
	// 		columns: createTruthy(teamsSchema.read.shape),
	// 	});

	// 	return {
	// 		teams: teams.map((team) => teamsSchema.read.parse(team)),
	// 	};
	// }),
	create: noAuthProcedure
		.use(isAuthed)
		.input(teamsSchema.create)
		.mutation(async ({ ctx, input }) => {
			const { user } = ctx.auth;
			return ctx.db.transaction(async (trx) => {
				const newTeamId = generateId({
					prefix: 'T',
				});

				// Create new team
				const newTeam = await trx
					.insert(teams)
					.values({
						...input,
						id: newTeamId,
						ownerId: user.id,
					})
					.returning({
						id: teams.id,
						slug: teams.slug,
					});
				// Add to join table
				await trx.insert(teamMembers).values({
					userId: user.id,
					teamId: newTeam[0].id,
					userRole: 'member',
				});

				// Return data
				return { slug: input.slug };
			});
		}),
});
