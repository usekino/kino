import type { FeedbackCommentsReactionSchema } from '@/lib/schema/feedback/comments/feedback-comments-reaction.schema';

import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { feedbackCommentsReactions } from '@/lib/db/tables/feedback/comments/feedback-comments-reactions.table';
import { FeedbackCommentsSchema } from '@/lib/schema/feedback/comments/feedback-comments.schema';

const generate = (
	{ feedbackComments }: { feedbackComments: FeedbackCommentsSchema['Seed'][] },
	count: number
) => {
	const feedbackCommentReactionValues: FeedbackCommentsReactionSchema['Seed'][] = [];

	for (let i = 0; i < count; i++) {
		feedbackCommentReactionValues.push({
			feedbackCommentId: faker.number
				.int({
					min: 1,
					max: feedbackComments.length,
				})
				.toString(),
			reactorUserId: faker.number
				.int({
					min: 1,
					max: 10,
				})
				.toString(),
			reaction: faker.helpers.arrayElement(['heart', 'wow', 'thumbsUp', 'thumbsDown']),
		});
	}
	return feedbackCommentReactionValues;
};

export const seedFeedbackCommentsReaction = async (...args: Parameters<typeof generate>) => {
	const values = generate(...args);
	try {
		await httpDb.insert(feedbackCommentsReactions).values(values);
		return values;
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with FEEDBACK_COMMENT_REACTION...');
	}
};
