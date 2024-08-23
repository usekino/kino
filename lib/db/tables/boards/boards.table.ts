import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../_shared';
import { boardsFeedback } from '../boards/boards-feedback.table';
import { projects } from '../projects/projects.table';

export const boards = pgTable('boards', {
	...defaultColumns(),
	projectId: varchar('project_id', { length: 255 }).notNull(),
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

export const boardsRelations = relations(boards, ({ one, many }) => ({
	project: one(projects, {
		fields: [boards.projectId],
		references: [projects.id],
		relationName: 'boards_projects',
	}),
	boardFeedback: many(boardsFeedback, {
		relationName: 'boards_feedback',
	}),
}));
