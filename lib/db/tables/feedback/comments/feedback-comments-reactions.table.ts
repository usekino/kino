import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '@/lib/db/tables/_shared';

import { feedbackUsers } from '../feedback-users.table';
import { feedbackComments } from './feedback-comments.table';

export const feedbackCommentsReactions = pgTable('feedback_comments_reactions', {
	...defaultColumns(),
	feedbackCommentId: varchar('feedback_comment_id', {
		length: 255,
	}).notNull(),
	reactorUserId: varchar('reactor_user_id', {
		length: 255,
	}).notNull(),
	reaction: varchar('reaction', {
		length: 255,
	}).notNull(),
});

export const feedbackCommentsReactionsRelations = relations(
	feedbackCommentsReactions,
	({ one }) => ({
		user: one(feedbackUsers, {
			fields: [feedbackCommentsReactions.reactorUserId],
			references: [feedbackUsers.userId],
			relationName: 'feedbackComments_feedbackCommentsReactions',
		}),
		feedbackComment: one(feedbackComments, {
			fields: [feedbackCommentsReactions.feedbackCommentId],
			references: [feedbackComments.id],
			relationName: 'feedbackComments_feedbackCommentsReactions',
		}),
	})
);