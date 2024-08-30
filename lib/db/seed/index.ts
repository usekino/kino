import { seedAuthentications } from './auth/authentications.seed';
import { seedUsers } from './auth/users.seed';
import { seedBoards } from './boards/boards.seed';
import { seedFeedbackCommentsHistory } from './feedback/comments/feedback-comments-history.seed';
import { seedFeedbackCommentsReaction } from './feedback/comments/feedback-comments-reaction.seed';
import { seedFeedbackComments } from './feedback/comments/feedback-comments.seed';
import { seedFeedbackAssignments } from './feedback/feedback-assignments.seed';
import { seedFeedbackUpdates } from './feedback/feedback-updates.seed';
import { seedFeedbackVotes } from './feedback/feedback-votes.seed';
import { seedFeedback } from './feedback/feedback.seed';
import { seedProjectMembers } from './projects/project-members.seed';
import { seedProjects } from './projects/projects.seed';
import { seedTeamMembers } from './teams/team-members.seed';
import { seedTeams } from './teams/teams.seed';

export const seeder = async () => {
	try {
		// 1. Users & authentications
		const users = await seedUsers(5);
		await seedAuthentications({ users });

		// 2. Teams
		const teams = await seedTeams({ users }, 2);
		await seedTeamMembers({ teams, users });

		// 3. Projects
		const projects = await seedProjects(teams, 5);
		await seedProjectMembers({ projects, users });

		// 4. Boards
		const boards = await seedBoards({ projects }, 10);

		// 4. Feedback
		const feedback = await seedFeedback({ boards, users, teams }, 20);
		await seedFeedbackAssignments({ feedback, users }, 20);

		const feedbackVotes = await seedFeedbackVotes({ feedback, users }, 20);
		const feedbackUpdates = await seedFeedbackUpdates({ feedback, users }, 10);

		const feedbackComments = await seedFeedbackComments({ feedback, users }, 50);
		const feedbackCommentsHistory = await seedFeedbackCommentsHistory({ feedbackComments }, 10);
		const feedbackCommentsReaction = await seedFeedbackCommentsReaction({ feedbackComments }, 10);

		console.log('✅ Seeded: ', {
			users: users.length,
			teams: teams.length,
			projects: projects.length,
			boards: boards.length,
			feedback: {
				feedback: feedback.length,
				votes: feedbackVotes.length,
				updates: feedbackUpdates.length,
				comments: {
					comments: feedbackComments.length,
					history: feedbackCommentsHistory.length,
					Reaction: feedbackCommentsReaction.length,
				},
			},
		});
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with DATABASE...');
	}
};
