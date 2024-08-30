import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { feedbackAssignments } from '@/lib/db/tables/feedback/feedback-assignments.table';
import { FeedbackAssignmentsSchema } from '@/lib/schema/feedback/feedback-assignments.schema';
import { FeedbackSchema } from '@/lib/schema/feedback/feedback.schema';
import { UsersSchema } from '@/lib/schema/users.schema';

const generate = (
	{
		users,
		feedback,
	}: {
		users: UsersSchema['Seed'][];
		feedback: FeedbackSchema['Seed'][];
	},
	count: number
) => {
	const feedbackAssignments: FeedbackAssignmentsSchema['Seed'][] = [];

	for (let i = 0; i < count; i++) {
		feedbackAssignments.push({
			id: (1 + i).toString(),
			userId: faker.number
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
		});
	}
	return feedbackAssignments;
};

export const seedFeedbackAssignments = async (...args: Parameters<typeof generate>) => {
	const values = generate(...args);
	try {
		await httpDb.insert(feedbackAssignments).values(values);
		return values;
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with feedbackAssignments...');
	}
};
