import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { feedbackVotes } from '@/lib/db/tables/feedback/feedback-votes.table';

export const seedFeedbackVotes = async (count: number = 1000) => {
	const feedbackVotesValues = [];

	for (let i = 0; i < count; i++) {
		feedbackVotesValues.push({
			userId: faker.number
				.int({
					min: 1,
					max: 10,
				})
				.toString(),
			feedbackId: faker.number
				.int({
					min: 1,
					max: 500,
				})
				.toString(),
			vote: 1,
		});
	}

	try {
		await httpDb.insert(feedbackVotes).values(feedbackVotesValues).onConflictDoNothing();
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with FEEDBACK_VOTES...');
	}
};
