import type { FeedbackCommentsHistorySchema } from '@/lib/schema/feedback/comments/feedback-comments-history.schema';

import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { feedbackCommentsHistory } from '@/lib/db/tables/feedback/comments/feedback-comments-history.table';
import { FeedbackCommentsSchema } from '@/lib/schema/feedback/comments/feedback-comments.schema';

const generate = (
	{ feedbackComments }: { feedbackComments: FeedbackCommentsSchema['Seed'][] },
	count: number
) => {
	const feedbackCommentHistoryValues: FeedbackCommentsHistorySchema['Seed'][] = [];

	for (let i = 0; i < count; i++) {
		feedbackCommentHistoryValues.push({
			feedbackCommentId: faker.number
				.int({
					min: 1,
					max: feedbackComments.length,
				})
				.toString(),
			content: faker.lorem.paragraphs(
				faker.number.int({
					min: 1,
					max: 3,
				})
			),
		});
	}
	return feedbackCommentHistoryValues;
};

export const seedFeedbackCommentsHistory = async (...args: Parameters<typeof generate>) => {
	const values = generate(...args);
	try {
		await httpDb.insert(feedbackCommentsHistory).values(values);
		return values;
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with FEEDBACK_COMMENT_HISTORY...');
	}
};
