import { and, eq, exists, or } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/lib/db';
import { teamMembers, teams } from '@/lib/db/tables';
import { projectMembers } from '@/lib/db/tables/projects/project-members.table';
import { projects } from '@/lib/db/tables/projects/projects.table';
import { feedbackSchema } from '@/lib/schema/feedback/feedback.schema';
import { usersSchema } from '@/lib/schema/users.schema';
import { procedure, router } from '@/lib/trpc/trpc';
import { createTruthy } from '@/lib/utils';

import { isAuthed } from '../middleware/is-authed';

export const feedbackRouter = router({
	byProject: procedure
		.use(isAuthed)
		.input(
			z.object({
				project: z.string(),
				board: z.string().optional(),
			})
		)
		.query(async ({ ctx, input }) => {
			const data = await db.query.projects.findFirst({
				where: () =>
					and(
						// Check that project exists
						eq(projects.slug, input.project),
						or(
							// Either be an admin of the team...
							exists(
								db
									.select()
									.from(teamMembers)
									.innerJoin(teams, eq(teams.id, teamMembers.teamId))
									.where(
										and(
											eq(teamMembers.userId, ctx.auth.user.id),
											eq(teamMembers.teamId, teams.id),
											eq(teamMembers.userRole, 'admin')
										)
									)
							),
							// ...or a member of the project
							exists(
								db
									.select()
									.from(projectMembers)
									.innerJoin(projects, eq(projects.id, projectMembers.projectId))
									.where(
										and(
											eq(projectMembers.userId, ctx.auth.user.id),
											eq(projectMembers.projectId, projects.id)
										)
									)
							)
						)
					),
				with: {
					boards: {
						where(table, { eq }) {
							if (input.board) {
								return eq(table.slug, input.board);
							}
						},
						with: {
							feedback: {
								columns: createTruthy(feedbackSchema.read.shape),
								with: {
									assignedUser: {
										columns: createTruthy(usersSchema.read.shape),
									},
									votes: {
										columns: {
											id: true,
										},
									},
								},
							},
						},
					},
				},
			});

			return data ?? 'No project found';
		}),
});
