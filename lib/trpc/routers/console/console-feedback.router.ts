import { aliasedTable, count, eq, sql } from 'drizzle-orm';
import { withCursorPagination as cursorPagination } from 'drizzle-pagination';
import { z } from 'zod';

import { boards, feedback, feedbackVotes, users } from '@/lib/db/tables';
import { projects } from '@/lib/db/tables/projects/projects.table';
import { boardsSchema } from '@/lib/schema/boards/boards.schema';
import { feedbackSchema } from '@/lib/schema/feedback/feedback.schema';
import { usersSchema } from '@/lib/schema/users.schema';
import { consoleProcedure } from '@/lib/trpc/procedures';
import { router } from '@/lib/trpc/trpc';

const userAssigned = aliasedTable(users, 'userAssigned');

export const consoleFeedbackRouter = router({
	table: consoleProcedure
		.input(
			z.object({
				projectSlug: z.string(),
				boardSlug: z.string().optional(),
				limit: z.number().min(1).max(100).optional().default(2),
				cursor: z.number().optional(),
			})
		)
		.query(async ({ ctx, input }) => {
			const { limit: _limit, cursor } = input;

			const { orderBy, limit, where } = cursorPagination({
				where: eq(projects.slug, input.projectSlug),
				limit: _limit,
				cursors: [
					[
						feedback.autoId, // Column to use for cursor
						'desc', // Sort order ('asc' or 'desc')
						cursor ? cursor : undefined, // Cursor value
					],
				],
			});

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
				.groupBy(
					...Object.values(feedback),
					...Object.values(boards),
					...Object.values(userAssigned)
				)
				.where(where)
				.orderBy(...orderBy)
				.limit(limit);

			const total = await ctx.db
				.select({
					count: count(),
				})
				.from(feedback)
				.innerJoin(boards, eq(boards.id, feedback.boardId))
				.innerJoin(projects, eq(projects.id, boards.projectId))
				.where(eq(projects.slug, input.projectSlug));

			const items = feedbackSchema._all
				.pick({
					autoId: true,
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

			const test = {
				items,
				count: total[0].count,
				nextCursor: items.length > 0 ? items[items.length - 1].autoId : null,
				prevCursor: items.length > 0 ? items[0].autoId : null,
			};

			return test;
		}),
});
