import { z } from 'zod';

import { teamMembers } from '@/lib/db/tables/teams/team-members.table';
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
			const projects = await ctx.db.query.projects.findFirst({
				where(projects, { eq, and, inArray }) {
					return and(
						// 1. Check that project exits
						eq(projects.slug, input.project),
						// 2. Check that user is a member of the project's team
						inArray(
							projects.teamId,
							ctx.db
								.select({
									teamId: teamMembers.teamId,
								})
								.from(teamMembers)
								.where(
									and(
										eq(teamMembers.userId, ctx.auth.user.id),
										eq(teamMembers.teamId, projects.teamId) // TODO: check that this is correctly querying the correct teamMembers row(s)
									)
								)
						)
					);
				},
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

			const feedback = projects?.boards?.flatMap((board) => {
				return board.feedback.flatMap((feedback) => {
					return feedback;
				});
			});

			return feedback;
		}),
});
