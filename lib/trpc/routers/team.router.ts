import { TRPCError } from '@trpc/server';

import { getTeamData } from '@/lib/db/prepared';
import { xUsersTeams } from '@/lib/db/tables';
import { teams } from '@/lib/db/tables/teams.table';
import { teamSelectSchema } from '@/lib/schema/dashboard.schema';
import { readProjectSchema } from '@/lib/schema/project.schema';
import { createTeamSchema, selectTeamSchema } from '@/lib/schema/team.schema';
import { procedure, router } from '@/lib/trpc/trpc';
import { createTruthyObject, generateId } from '@/lib/utils';

import { isAuthed } from '../middleware/is-authed';
import { rateLimit } from '../middleware/rate-limit';
import { getTeamProjectSelect, teamProjectSelect } from './lib/selectedTeamProject';

export const teamRouter = router({
	findBySlug: procedure.input(selectTeamSchema.pick({ slug: true })).query(async ({ input }) => {
		const team = await getTeamData(input.slug);
		return team;
	}),
	findByMembership: procedure.use(isAuthed).query(async ({ ctx }) => {
		const { user } = ctx.auth;

		const teams = await ctx.db.query.xUsersTeams.findMany({
			where: (userTables, { eq }) => eq(userTables.userId, user.id),
			columns: {},
			with: {
				team: {
					columns: createTruthyObject(selectTeamSchema.shape),
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
			columns: createTruthyObject(selectTeamSchema.shape),
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
				await trx.insert(xUsersTeams).values({
					userId: user.id,
					teamId: newTeam[0].id,
					userRole: ['member'],
				});
				// Update Upstash
				await teamProjectSelect.update(user.id, {
					userId: user.id,
					team: {
						id: newTeam[0].id,
						slug: newTeam[0].slug,
					},
				});
				// Return data
				return { slug: input.slug };
			});
		}),
	switch: procedure
		.use(
			rateLimit({
				tokens: 3,
				duration: '60 s',
			})
		)
		.use(isAuthed)
		.input(teamSelectSchema.omit({ userId: true }))
		.mutation(async ({ ctx, input }) => {
			const { user } = ctx.auth;

			const userTeam = await ctx.db.query.xUsersTeams.findFirst({
				columns: {
					id: true,
				},
				where: (table, { eq, and }) =>
					and(
						eq(table.userId, user.id),
						eq(table.teamId, input.team.id) //
					),
			});

			if (!userTeam || !userTeam.id) {
				throw new TRPCError({
					code: 'FORBIDDEN',
					message: `User is not authorized member of project's team.`,
				});
			}

			const projects = await ctx.db.query.projects.findMany({
				where: (project, { eq }) => eq(project.teamId, userTeam.id),
				columns: createTruthyObject(readProjectSchema.shape),
			});

			const project = {
				userId: user.id,
				project: {
					slug: projects[0].slug,
					id: projects[0].id,
				},
				...input,
			};

			await teamProjectSelect.update(user.id, project);

			return project;
		}),
});
