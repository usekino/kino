import 'dotenv/config';

import { seedAuthentications } from './authentications.seed';
import { seedFeedbackComments } from './feedback/feedback-comments.seed';
import { seedFeedback } from './feedback/feedback.seed';
import { seedXUsersProjects } from './join/x-users-project.seed';
import { seedXUsersTeams } from './join/x-users-teams.seed';
import { seedProjects } from './projects.seed';
import { seedTeams } from './teams.seed';
import { seedUsers } from './users.seed';

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

	const end = Date.now();
	console.log('✅ Seeding completed in', end - start, 'ms');
	process.exit(0);
};

seed().catch((err) => {
	console.error('❌ Seeding failed');
	console.error(err);
	process.exit(1);
});
