import type { FeedbackVotesSchema } from '@/lib/schema/feedback/feedback-votes.schema';
import type { FeedbackSchema } from '@/lib/schema/feedback/feedback.schema';
import type { UsersSchema } from '@/lib/schema/users.schema';

import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { feedbackVotes } from '@/lib/db/tables/feedback/feedback-votes.table';

const generate = (
	{
		feedback,
		users,
	}: {
		feedback: FeedbackSchema['Seed'][];
		users: UsersSchema['Seed'][];
	},
	count: number
) => {
	const feedbackVotesValues: FeedbackVotesSchema['Seed'][] = [];
	for (let i = 0; i < count; i++) {
		feedbackVotesValues.push({
			voterId: faker.number
				.int({
					min: 1,
					max: users.length,
				})
				.toString(),
			feedbackId: faker.number
				.int({
					min: 1,
					max: feedback.length,
				})
				.toString(),
			vote: 1,
		});
	}
	return feedbackVotesValues;
};

export const seedFeedbackVotes = async (...args: Parameters<typeof generate>) => {
	const values = generate(...args);
	try {
		await httpDb.insert(feedbackVotes).values(values).onConflictDoNothing();
		return values;
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with FEEDBACK_VOTES...');
	}
};
