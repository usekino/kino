import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '@/lib/db/tables/_shared';

import { feedbackComments } from './feedback-comments.table';

export const feedbackCommentsHistory = pgTable('feedback_comments_history', {
	...defaultColumns(),
	feedbackCommentId: varchar('feedback_comment_id', {
		length: 255,
	}).notNull(),
	content: varchar('content', {
		length: 3072,
	}).notNull(),
});

export const feedbackCommentsHistoryRelations = relations(feedbackCommentsHistory, ({ one }) => ({
	feedbackComment: one(feedbackComments, {
		fields: [feedbackCommentsHistory.feedbackCommentId],
		references: [feedbackComments.id],
		relationName: 'feedbackComments_feedbackCommentsHistory',
	}),
}));
