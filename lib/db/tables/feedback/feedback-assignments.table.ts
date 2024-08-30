import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../_shared';
import { users } from '../auth/users.table';
import { feedback } from './feedback.table';

export const feedbackAssignments = pgTable('feedback_assignments', {
	...defaultColumns(),
	feedbackId: varchar('feedback_id', {
		length: 255,
	}).notNull(),
	userId: varchar('user_id', {
		length: 255,
	}).notNull(),
});

export const feedbackAssignmentsRelations = relations(feedbackAssignments, ({ one }) => ({
	user: one(users, {
		fields: [feedbackAssignments.userId],
		references: [users.id],
		relationName: 'users_feedbackAssignments',
	}),
	feedback: one(feedback, {
		fields: [feedbackAssignments.feedbackId],
		references: [feedback.id],
		relationName: 'feedback_feedbackAssignments',
	}),
}));
