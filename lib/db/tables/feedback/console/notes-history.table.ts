import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../../_shared';
import { feedback } from '../feedback.table';

export const notesHistory = pgTable('feedback_console_notes_history', {
	...defaultColumns(),
	feedbackId: varchar('feedback_id', {
		length: 255,
	}).notNull(),
	content: varchar('content', {
		length: 3072,
	}).notNull(),
});

export const notesHistoryRelations = relations(notesHistory, ({ one }) => ({
	feedback: one(feedback, {
		fields: [notesHistory.feedbackId],
		references: [feedback.id],
		relationName: 'feedback_notes_history',
	}),
}));
