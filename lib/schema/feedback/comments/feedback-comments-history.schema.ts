import type { SchemaObject } from '@/lib/schema/_shared';
import type { Refine } from 'drizzle-zod';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { feedbackCommentsHistory } from '@/lib/db/tables/feedback/comments/feedback-comments-history.table';

const refineSchema = {
	feedbackCommentId: ({ feedbackCommentId }) => feedbackCommentId.min(3),
} satisfies Refine<typeof feedbackCommentsHistory, 'select'>;

export const feedbackCommentsHistorySchema = {
	create: createInsertSchema(feedbackCommentsHistory, refineSchema),
	read: createSelectSchema(feedbackCommentsHistory, refineSchema),
	update: createInsertSchema(feedbackCommentsHistory, refineSchema),
	delete: createInsertSchema(feedbackCommentsHistory, refineSchema).pick({
		id: true,
	}),
	seed: createInsertSchema(feedbackCommentsHistory, refineSchema),
};

export type FeedbackCommentsHistorySchema = SchemaObject<typeof feedbackCommentsHistorySchema>;
