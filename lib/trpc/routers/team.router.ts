import { getTeamData } from '@/lib/db/prepared';
import { teamUsers } from '@/lib/db/tables';
import { teams } from '@/lib/db/tables/teams/teams.table';
import { createTeamSchema, selectTeamSchema } from '@/lib/schema/team.schema';
import { procedure, router } from '@/lib/trpc/trpc';
import { createTruthy, generateId } from '@/lib/utils';

import { isAuthed } from '../middleware/is-authed';
import { getTeamProjectSelect } from './lib/selectedTeamProject';

export const teamRouter = router({
	findBySlug: procedure.input(selectTeamSchema.pick({ slug: true })).query(async ({ input }) => {
		const team = await getTeamData(input.slug);
		return team;
	}),
	findByMembership: procedure.use(isAuthed).query(async ({ ctx }) => {
		const { user } = ctx.auth;

		const teams = await ctx.db.query.teamUsers.findMany({
			where: (userTables, { eq }) => eq(userTables.userId, user.id),
			columns: {},
			with: {
				team: {
					columns: createTruthy(selectTeamSchema.shape),
				},
			},
		});

		const selected = await getTeamProjectSelect(user.id);

		if (!teams || teams.length <= 0) {
			return {
				teams: null,
				selected,
			};
		}

		return {
			teams: teams.map(({ team }) => selectTeamSchema.parse(team)),
			selected,
		};
	}),
	findByOwnership: procedure.use(isAuthed).query(async ({ ctx }) => {
		const { user } = ctx.auth;
		const teams = await ctx.db.query.teams.findMany({
			where: (table, { eq }) => eq(table.ownerId, user.id),
			columns: createTruthy(selectTeamSchema.shape),
		});

		const selected = await getTeamProjectSelect(user.id);

		return {
			teams: teams.map((team) => selectTeamSchema.parse(team)),
			selected,
		};
	}),
	create: procedure
		.use(isAuthed)
		.input(createTeamSchema)
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
				await trx.insert(teamUsers).values({
					userId: user.id,
					teamId: newTeam[0].id,
					userRole: ['member'],
				});

				// Return data
				return { slug: input.slug };
			});
		}),
});
