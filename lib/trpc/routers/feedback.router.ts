import { aliasedTable, asc, desc, eq, sql } from 'drizzle-orm';
import { z } from 'zod';

import { boards, feedback, feedbackVotes, users } from '@/lib/db/tables';
import { projects } from '@/lib/db/tables/projects/projects.table';
import { boardsSchema } from '@/lib/schema/boards/boards.schema';
import { feedbackSchema } from '@/lib/schema/feedback/feedback.schema';
import { usersSchema } from '@/lib/schema/users.schema';
import { procedure, router } from '@/lib/trpc/trpc';

import { consoleAuthPlugin } from '../plugins/console-auth-plugin';

const { isTeamMember } = consoleAuthPlugin();

const userAssigned = aliasedTable(users, 'userAssigned');

export const feedbackRouter = router({
	projectTable: procedure
		.unstable_concat(isTeamMember)
		.input(
			z.object({
				projectSlug: z.string(),
				boardSlug: z.string().optional(),
				//
				limit: z.number().min(1).max(100).nullish(),
				cursor: z.number().nullish(),
				direction: z.enum(['forward', 'backward']).default('forward'),
			})
		)
		.query(async ({ ctx, input }) => {
			const data = await ctx.db
				.select({
					...Object.fromEntries(Object.entries(feedback)),
					board: boards,
					userAssigned,
					votes: sql<number>`COUNT(${feedbackVotes.id})::int`,
				})
				.from(feedback)
				.innerJoin(boards, eq(boards.id, feedback.boardId))
				.innerJoin(projects, eq(projects.id, boards.projectId))
				.leftJoin(userAssigned, eq(userAssigned.id, feedback.assignedUserId))
				.leftJoin(feedbackVotes, eq(feedbackVotes.feedbackId, feedback.id))
				.where(eq(projects.slug, input.projectSlug))
				.groupBy(
					...Object.values(feedback),
					...Object.values(boards),
					...Object.values(userAssigned)
				);

			return feedbackSchema.read
				.pick({
					id: true,
					title: true,
					description: true,
					status: true,
				})
				.merge(
					z.object({
						board: boardsSchema.read.pick({
							name: true,
						}),
						userAssigned: usersSchema.read
							.pick({
								username: true,
							})
							.nullable(),
						votes: z.number(),
					})
				)
				.array()
				.parse(data);
		}),
});
