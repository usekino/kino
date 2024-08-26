import { relations, sql } from 'drizzle-orm';
import { json, pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '@/lib/db/tables/_shared';
import { feedback } from '@/lib/db/tables/feedback/feedback.table';

import { feedbackUsers } from '../feedback-users.table';
import { feedbackCommentsAttachments } from './feedback-comments-attachments.table';
import { feedbackCommentsHistory } from './feedback-comments-history.table';
import { feedbackCommentsReactions } from './feedback-comments-reactions.table';

export const feedbackComments = pgTable('feedback_comments', {
	...defaultColumns(),
	feedbackId: varchar('feedback_id', {
		length: 255,
	}).notNull(),
	userId: varchar('user_id', {
		length: 255,
	}).notNull(),
	status: json('status')
		.$type<string[]>()
		.default(sql`'["open"]'`)
		.notNull(),
});

export const feedbackCommentsRelations = relations(feedbackComments, ({ one, many }) => ({
	feedback: one(feedback, {
		fields: [feedbackComments.feedbackId],
		references: [feedback.id],
		relationName: 'feedback_feedbackComments',
	}),
	user: one(feedbackUsers, {
		fields: [feedbackComments.userId],
		references: [feedbackUsers.id],
		relationName: 'feedbackComments_feedbackUsers',
	}),
	commentHistory: many(feedbackCommentsHistory, {
		relationName: 'feedbackComments_feedbackCommentsHistory',
	}),
	reactions: many(feedbackCommentsReactions, {
		relationName: 'feedbackComments_feedbackCommentsReactions',
	}),
	attachments: many(feedbackCommentsAttachments, {
		relationName: 'feedbackComments_feedbackCommentsAttachments',
	}),
}));
