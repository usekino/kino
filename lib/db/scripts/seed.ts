import 'dotenv/config';

import { seedAuthentications } from '@/lib/db/seed/authentications.seed';
import { seedFeedbackBoards } from '@/lib/db/seed/feedback/feedback-boards.seed';
import { seedFeedbackComments } from '@/lib/db/seed/feedback/feedback-comments.seed';
import { seedFeedbackVotes } from '@/lib/db/seed/feedback/feedback-votes.seed';
import { seedFeedback } from '@/lib/db/seed/feedback/feedback.seed';
import { seedProjects } from '@/lib/db/seed/projects.seed';
import { seedTeamsUsers } from '@/lib/db/seed/teams/teams-users.seed';
import { seedTeams } from '@/lib/db/seed/teams/teams.seed';
import { seedUsers } from '@/lib/db/seed/users.seed';

const seed = async () => {
	console.log('⏳ Seeding database...');
	const start = Date.now();

	await Promise.all([
		// Critical tables that must be seeded first
		seedUsers(),
		seedAuthentications(),
		seedTeams(),
		seedTeamsUsers(),
		seedProjects(),
	]);

	await Promise.all([
		seedTeamsUsers(),
		seedFeedback(),
		seedFeedbackComments(),
		seedFeedbackVotes(),
		seedFeedbackBoards(),
	]);

	const end = Date.now();
	console.log('✅ Seeding completed in', end - start, 'ms');
	process.exit(0);
};

seed().catch((err) => {
	console.error('❌ Seeding failed');
	console.error(err);
	process.exit(1);
});
