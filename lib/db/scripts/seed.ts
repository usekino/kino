import 'dotenv/config';

import { seedAuthentications } from '@/lib/db/seed/authentications.seed';
import { seedFeedbackComments } from '@/lib/db/seed/feedback/feedback-comments.seed';
import { seedFeedbackVotes } from '@/lib/db/seed/feedback/feedback-votes.seed';
import { seedFeedback } from '@/lib/db/seed/feedback/feedback.seed';
import { seedXUsersProjects } from '@/lib/db/seed/join/x-users-project.seed';
import { seedXUsersTeams } from '@/lib/db/seed/join/x-users-teams.seed';
import { seedProjects } from '@/lib/db/seed/projects.seed';
import { seedTeams } from '@/lib/db/seed/teams.seed';
import { seedUsers } from '@/lib/db/seed/users.seed';

const seed = async () => {
	console.log('⏳ Seeding database...');
	const start = Date.now();

	await seedUsers();
	await seedAuthentications();
	await seedTeams();
	await seedProjects();
	await seedXUsersTeams();
	await seedXUsersProjects();
	await seedFeedback();
	await seedFeedbackComments();
	await seedFeedbackVotes();

	const end = Date.now();
	console.log('✅ Seeding completed in', end - start, 'ms');
	process.exit(0);
};

seed().catch((err) => {
	console.error('❌ Seeding failed');
	console.error(err);
	process.exit(1);
});
