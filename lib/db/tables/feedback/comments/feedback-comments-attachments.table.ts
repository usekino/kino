import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '@/lib/db/tables/_shared';

import { feedbackComments } from './feedback-comments.table';

export const feedbackCommentsAttachments = pgTable('feedback_comments_attachments', {
	...defaultColumns(),
	feedbackCommentId: varchar('feedback_comment_id', {
		length: 255,
	}).notNull(),
	attachmentId: varchar('attachment_id', {
		length: 255,
	}).notNull(),
});

export const feedbackCommentsAttachmentsRelations = relations(
	feedbackCommentsAttachments,
	({ one }) => ({
		feedbackComment: one(feedbackComments, {
			fields: [feedbackCommentsAttachments.feedbackCommentId],
			references: [feedbackComments.id],
			relationName: 'feedbackComments_feedbackCommentsAttachments',
		}),
	})
);
