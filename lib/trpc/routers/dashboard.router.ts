// TODO: Keep this until getUserProjects and getUserTeams are implemented
//

// import { teamsSchema } from '@/lib/schema/teams/teams.schema';
import { router } from '@/lib/trpc/trpc';

// import { createTruthy } from '@/lib/utils';

// import { isAuthed } from '../middleware/is-authed';

export const dashboardRouter = router({
	// userTeams: procedure.use(isAuthed).query(async ({ ctx }) => {
	// 	const { user } = ctx.auth;
	// 	return await ctx.db.query.teamMembers.findMany({
	// 		columns: {},
	// 		where: (table, { eq, and, or, not }) => {
	// 			return and(
	// 				eq(table.userId, user.id),
	// 				or(
	// 					eq(table.userRole, 'admin'),
	// 					eq(table.userRole, 'member') //
	// 				),
	// 				not(eq(table.userRole, 'blocked'))
	// 			);
	// 		},
	// 		with: {
	// 			team: {
	// 				columns: createTruthy(teamsSchema.read.shape),
	// 			},
	// 		},
	// 	});
	// }),
});
