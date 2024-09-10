import { TRPCError } from '@trpc/server';
import { aliasedTable, and, eq, not, or, sql } from 'drizzle-orm';
import { z } from 'zod';

import { boards, feedback, teamMembers, teams, users } from '@/lib/db/tables';
import { projectMembers } from '@/lib/db/tables/projects/project-members.table';
import { projects } from '@/lib/db/tables/projects/projects.table';
import { procedure, router } from '@/lib/trpc/trpc';

import { isAuthed } from '../middleware/is-authed';

const userAssigned = aliasedTable(users, 'userAssigned');

export const feedbackRouter = router({
	getByProject: procedure
		.use(isAuthed)
		.input(
			z.object({
				projectSlug: z.string(),
				boardSlug: z.string().optional(),
			})
		)
		.query(async ({ ctx, input }) => {
			// ✅ TODO: Add checks for front-end users (projectMembers)
			const data = await ctx.db
				.select({
					id: feedback.id,
					title: feedback.title,
					creatorId: feedback.authorId,
					assignedUserId: feedback.assignedUserId,
					status: feedback.status,
					project: {
						id: projects.id,
						name: projects.name,
						slug: projects.slug,
					},
					board: {
						id: boards.id,
						name: boards.name,
						slug: boards.slug,
					},
					role: sql<string>`
						CASE
							WHEN ${teamMembers.userRole} @> ${'"owner"'}
							THEN 'owner'
							ELSE 'member'
						END
					`.as('access'),
					userAssigned: userAssigned,
				})
				.from(feedback)
				.leftJoin(userAssigned, eq(feedback.assignedUserId, userAssigned.id))
				.innerJoin(boards, eq(feedback.boardId, boards.id))
				.innerJoin(projects, eq(boards.projectId, projects.id))
				.leftJoin(teams, eq(projects.teamId, teams.id))
				.leftJoin(
					teamMembers,
					and(
						eq(teamMembers.teamId, teams.id),
						eq(teamMembers.userId, ctx.auth.user.id) //
					)
				)
				.where(
					and(
						eq(projects.slug, input.projectSlug),
						or(
							sql`${teamMembers.userRole} @> ${'"owner"'}`,
							sql`${teamMembers.userRole} @> ${'"member"'}` //
						),
						not(sql`${teamMembers.userRole} @> ${'"blocked"'}`)
					)
				);

			if (!data || data.length <= 0) {
				const userBlockedInTeam = await ctx.db
					.select()
					.from(teamMembers)
					.innerJoin(teams, eq(teams.id, teamMembers.teamId))
					.where(
						and(
							eq(teamMembers.userId, ctx.auth.user.id),
							eq(teamMembers.teamId, teams.id),
							sql`${teamMembers.userRole} @> ${'"blocked"'}`
						)
					)
					.then((res) => res.length > 0);

				if (userBlockedInTeam) {
					throw new TRPCError({
						code: 'FORBIDDEN',
						message: 'User is not authorized member of team',
					});
				}

				const userBlockedInProject = await ctx.db
					.select()
					.from(projectMembers)
					.innerJoin(projects, eq(projects.id, projectMembers.projectId))
					.where(
						and(
							eq(projectMembers.userId, ctx.auth.user.id),
							eq(projectMembers.projectId, projects.id),
							sql`${projectMembers.userRole} @> ${'"blocked"'}`
						)
					)
					.then((res) => res.length > 0);

				if (userBlockedInProject) {
					throw new TRPCError({
						code: 'FORBIDDEN',
						message: 'User is not authorized member of project',
					});
				}
			}

			return data;
		}),
});
