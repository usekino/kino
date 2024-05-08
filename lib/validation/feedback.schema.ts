import { mutateFeedbackSchema } from '@/lib/db/schema/feedback/feedback.table';

import { mutateFeedbackCommentsSchema } from '../db/schema/feedback/feedback-comments.table';

export const createFeedbackSchema = mutateFeedbackSchema
	.pick({
		title: true,
		description: true,
		boardId: true,
		teamId: true,
		projectId: true,
	})
	.and(mutateFeedbackCommentsSchema.pick({ content: true }));
