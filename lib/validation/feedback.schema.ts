import { mutateFeedbackSchema } from '@/lib/db/tables/feedback/feedback.table';

import { mutateFeedbackCommentsSchema } from '../db/tables/feedback/feedback-comments.table';

export const createFeedbackSchema = mutateFeedbackSchema
	.pick({
		title: true,
		description: true,
		boardId: true,
		teamId: true,
		projectId: true,
	})
	.and(mutateFeedbackCommentsSchema.pick({ content: true }));
