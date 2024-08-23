import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../_shared';
import { feedback } from '../feedback/feedback.table';
import { boards } from './boards.table';

export const boardsFeedback = pgTable('feedback_boards', {
	...defaultColumns(),
	boardId: varchar('board_id', { length: 255 }).notNull(),
	feedbackId: varchar('feedback_id', { length: 255 }).notNull(),
});

export const boardsFeedbackRelations = relations(boardsFeedback, ({ one }) => ({
	board: one(boards, {
		fields: [boardsFeedback.boardId],
		references: [boards.id],
		relationName: 'boards_boardsFeedback',
	}),
	feedback: one(feedback, {
		fields: [boardsFeedback.feedbackId],
		references: [feedback.id],
		relationName: 'boardsFeedback_feedback',
	}),
}));
