import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../../_shared';
import { feedback } from '../feedback.table';

export const notes = pgTable('feedback_console_notes', {
	...defaultColumns(),
	feedbackId: varchar('feedback_id', {
		length: 255,
	}).notNull(),
	authorId: varchar('author_id', {
		length: 255,
	}).notNull(),
});

export const notesRelations = relations(notes, ({ one }) => ({
	feedback: one(feedback, {
		fields: [notes.feedbackId],
		references: [feedback.id],
		relationName: 'feedback_notes',
	}),
}));
