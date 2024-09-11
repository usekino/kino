import { aliasedTable, eq, sql } from 'drizzle-orm';
import { z } from 'zod';

import { boards, feedback, feedbackVotes, users } from '@/lib/db/tables';
import { projects } from '@/lib/db/tables/projects/projects.table';
import { boardsSchema } from '@/lib/schema/boards/boards.schema';
import { feedbackSchema } from '@/lib/schema/feedback/feedback.schema';
import { projectsSchema } from '@/lib/schema/projects/projects.schema';
import { usersSchema } from '@/lib/schema/users.schema';
import { procedure, router } from '@/lib/trpc/trpc';

import { consoleAuthPlugin } from '../plugins/console-auth-plugin';

const { isTeamMember } = consoleAuthPlugin();

const userAssigned = aliasedTable(users, 'userAssigned');
const userAuthor = aliasedTable(users, 'userAuthor');

export const feedbackRouter = router({
	getByProject: procedure
		.unstable_concat(isTeamMember)
		.input(
			z.object({
				projectSlug: z.string(),
				boardSlug: z.string().optional(),
			})
		)
		.query(async ({ ctx, input }) => {
			const data = await ctx.db
				.select({
					...Object.fromEntries(Object.entries(feedback)),
					project: projects,
					board: boards,
					userAuthor,
					userAssigned,
					votes: sql<number>`COUNT(${feedbackVotes.id})::int`,
				})
				.from(feedback)
				.innerJoin(boards, eq(boards.id, feedback.boardId))
				.innerJoin(projects, eq(projects.id, boards.projectId))
				.innerJoin(userAuthor, eq(userAuthor.id, feedback.authorId))
				.leftJoin(userAssigned, eq(userAssigned.id, feedback.assignedUserId))
				.leftJoin(feedbackVotes, eq(feedbackVotes.feedbackId, feedback.id))
				.where(eq(projects.slug, input.projectSlug))
				.groupBy(
					...Object.values(feedback),
					...Object.values(projects),
					...Object.values(boards),
					...Object.values(userAssigned),
					...Object.values(userAuthor)
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
						project: projectsSchema.read.pick({
							id: true,
							name: true,
							slug: true,
						}),
						board: boardsSchema.read.pick({
							id: true,
							name: true,
							slug: true,
						}),
						userAuthor: usersSchema.read.pick({
							id: true,
							username: true,
							name: true,
						}),
						userAssigned: usersSchema.read
							.pick({
								id: true,
								username: true,
								name: true,
							})
							.nullable(),
						votes: z.number(),
					})
				)
				.array()
				.parse(data);
		}),
});
