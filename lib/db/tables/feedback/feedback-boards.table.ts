import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../_shared';
import { projects } from '../projects.table';
import { feedback } from './feedback.table';

export const feedbackBoards = pgTable('feedback_boards', {
	...defaultColumns(),
	//
	projectId: varchar('project_id', { length: 255 }).notNull(),
	//
	slug: varchar('slug', {
		length: 255,
	}).notNull(),
	name: varchar('name', {
		length: 255,
	}).notNull(),
	description: varchar('description', {
		length: 3072,
	}),
});

export const feedbackBoardsRelations = relations(feedbackBoards, ({ one, many }) => ({
	project: one(projects, {
		fields: [feedbackBoards.projectId],
		references: [projects.id],
		relationName: 'project_feedback_boards',
	}),
	feedback: many(feedback, {
		relationName: 'feedback_board',
	}),
}));
