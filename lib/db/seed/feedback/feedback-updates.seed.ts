import type { FeedbackSchema } from '@/lib/schema/feedback/feedback.schema';
import type { UsersSchema } from '@/lib/schema/users.schema';

import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { feedbackUpdates } from '@/lib/db/tables/feedback/feedback-updates.table';
import { FeedbackUpdatesSchema } from '@/lib/schema/feedback/feedback-updates.schema';

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
	const feedbackUpdatesValues: FeedbackUpdatesSchema['Seed'][] = [];
	for (let i = 0; i < count; i++) {
		feedbackUpdatesValues.push({
			feedbackId: faker.number
				.int({
					min: 1,
					max: feedback.length,
				})
				.toString(),
			updaterUserId: faker.number
				.int({
					min: 1,
					max: users.length,
				})
				.toString(),
			content: faker.lorem.sentence(),
			type: faker.helpers.arrayElement(['comment', 'edit', 'status']),
			visibility: faker.helpers.arrayElement(['public', 'private']),
		});
	}
	return feedbackUpdatesValues;
};

export const seedFeedbackUpdates = async (...args: Parameters<typeof generate>) => {
	const values = generate(...args);
	try {
		await httpDb.insert(feedbackUpdates).values(values).onConflictDoNothing();
		return values;
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with FEEDBACK_UPDATES...');
	}
};
