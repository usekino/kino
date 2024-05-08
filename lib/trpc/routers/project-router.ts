import { TRPCError } from '@trpc/server';

import { getProjectData } from '@/lib/db/prepared';
import { projects, selectProjectSchema } from '@/lib/db/tables';
import { xUsersProjects } from '@/lib/db/tables/x-users-projects.table';
import { procedure, router } from '@/lib/trpc/trpc';
import { createTruthyObject } from '@/lib/utils';
import { teamProjectSelectSchema } from '@/lib/validation/dashboard-validation';
import { createProjectSchema, readProjectSchema } from '@/lib/validation/project-validation';

import { isAuthed } from '../middleware/is-authed';
import { rateLimit } from '../middleware/rate-limit';
import { getTeamProjectSelect, teamProjectSelect } from './lib/selectedTeamProject';

export const projectRouter = router({
	create: procedure
		.use(isAuthed)
		.input(createProjectSchema)
		.mutation(async ({ ctx, input }) => {
			const { user } = ctx.auth;

			return ctx.db.transaction(async (trx) => {
				// Check if the user is a member of the team
				const userTeam = await trx.query.xUsersTeams.findFirst({
					columns: {
						id: true,
						teamId: true,
					},
					where: (table, { eq, and }) =>
						and(
							eq(table.userId, user.id),
							eq(table.teamId, input.teamId)
							// arrayContains(table.userRole, ['admin'])
						),
					with: {
						team: {
							columns: {
								slug: true,
							},
						},
					},
				});

				console.log(userTeam, input);

				// ...throw if not.
				if (!userTeam || !userTeam.id || !userTeam.team.slug) {
					throw new TRPCError({
						code: 'FORBIDDEN',
						message: `User is not authorized member of project's team.`,
					});
				}
				// Create the project
				const newProject = await trx
					.insert(projects)
					.values({
						...input,
						teamId: userTeam.teamId,
					})
					.returning({
						id: projects.id,
						slug: projects.slug,
					});
				// Add to join table
				await trx.insert(xUsersProjects).values({
					userId: user.id,
					projectId: newProject[0].id,
					userRole: ['member', 'admin'],
				});
				// Update Upstash
				await teamProjectSelect.update(user.id, {
					userId: user.id,
					team: {
						id: userTeam.teamId,
						slug: userTeam.team.slug,
					},
					project: {
						slug: newProject[0].slug,
						id: newProject[0].id,
					},
				});
				// Return data
				return { projectSlug: input.slug, teamSlug: userTeam.team.slug };
			});
		}),
	findBySlug: procedure.input(selectProjectSchema.pick({ slug: true })).query(async ({ input }) => {
		return await getProjectData(input.slug);
	}),
	findByOwnership: procedure.use(isAuthed).query(async ({ ctx }) => {
		const { user } = ctx.auth;

		const projects = await ctx.db.query.projects.findMany({
			where: (table, { eq }) => eq(table.teamId, user.id),
			columns: createTruthyObject(readProjectSchema.shape),
		});

		const selected = await getTeamProjectSelect.match({
			userId: user.id,
		});

		return {
			projects,
			selected,
		};
	}),
	switch: procedure
		.use(
			rateLimit({
				tokens: 3,
				duration: '60 s',
			})
		)
		.use(isAuthed)
		.input(teamProjectSelectSchema.omit({ userId: true }))
		.mutation(async ({ ctx, input }) => {
			const { user } = ctx.auth;

			// NOTE: once we add project specific members/invites, we will need to
			// remove just check in favor of a project check
			const userTeam = await ctx.db.query.xUsersTeams.findFirst({
				columns: {
					id: true,
				},
				where: (table, { eq, and }) => {
					return and(
						eq(table.userId, user.id),
						eq(table.teamId, input.team.id) //
					);
				},
			});

			if (!userTeam || !userTeam.id) {
				throw new TRPCError({
					code: 'FORBIDDEN',
					message: `User is not authorized member of project's team.`,
				});
			}

			const project = {
				userId: user.id,
				...input,
			};

			await teamProjectSelect.update(user.id, project);

			return project;
		}),
});
