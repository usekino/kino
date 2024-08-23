import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../_shared';
import { feedbackUsers } from './feedback-users.table';
import { feedback } from './feedback.table';

export const feedbackUpdates = pgTable('feedback_updates', {
	...defaultColumns(),
	//
	feedbackId: varchar('feedback_id', {
		length: 255,
	}).notNull(),
	updaterUserId: varchar('updater_user_id', {
		length: 255,
	}).notNull(),
	type: varchar('type', {
		length: 255,
	}).notNull(),
	content: varchar('content', {
		length: 3072,
	}).notNull(),
	visibility: varchar('visibility', {
		length: 255,
	}).notNull(),
});

export const feedbackUpdatesRelations = relations(feedbackUpdates, ({ one }) => ({
	feedback: one(feedback, {
		fields: [feedbackUpdates.feedbackId],
		references: [feedback.id],
		relationName: 'feedback_updates',
	}),
	updaterUser: one(feedbackUsers, {
		fields: [feedbackUpdates.updaterUserId],
		references: [feedbackUsers.id],
		relationName: 'user_updates',
	}),
}));