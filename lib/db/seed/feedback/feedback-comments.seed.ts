import type { SeedFeedbackCommentsSchema } from '@/lib/db/tables/feedback/feedback-comments.table';

import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { feedbackComments } from '@/lib/db/tables/feedback/feedback-comments.table';

export const maxFeedbackCommentsCount = 100;

export const seedFeedbackComments = async () => {
	const generateFeedbackComments = (count: number) => {
		const feedbackComments: SeedFeedbackCommentsSchema[] = [];

		for (let i = 0; i < count; i++) {
			feedbackComments.push({
				userId: faker.number
					.int({
						min: 1,
						max: 10,
					})
					.toString(),
				feedbackId: faker.number
					.int({
						min: 1,
						max: 10,
					})
					.toString(),
				content: faker.lorem.sentence(),
			});
		}
		return feedbackComments;
	};

	try {
		await httpDb
			.insert(feedbackComments)
			.values(generateFeedbackComments(maxFeedbackCommentsCount));
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with FEEDBACK_COMMENTS...');
	}
};
