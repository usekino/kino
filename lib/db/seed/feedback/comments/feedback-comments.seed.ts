import type { FeedbackCommentsSchema } from '@/lib/schema/feedback/comments/feedback-comments.schema';

import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { feedbackComments } from '@/lib/db/tables/feedback/comments/feedback-comments.table';
import { FeedbackSchema } from '@/lib/schema/feedback/feedback.schema';
import { UsersSchema } from '@/lib/schema/users.schema';

export const maxFeedbackCommentsCount = 100;

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
	const feedbackComments: FeedbackCommentsSchema['Seed'][] = [];

	for (let i = 0; i < count; i++) {
		feedbackComments.push({
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
			status: ['open'],
		});
	}
	return feedbackComments;
};

export const seedFeedbackComments = async (...args: Parameters<typeof generate>) => {
	const values = generate(...args);
	try {
		await httpDb.insert(feedbackComments).values(values);
		return values;
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with FEEDBACK_COMMENTS...');
	}
};
