import { relations } from 'drizzle-orm';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../_shared';
import { projects } from '../projects.table';

export const feedbackBoards = pgTable('feedback_boards', {
	...defaultColumns(),
	//
	projectId: serial('project_id').notNull(),
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

export const feedbackBoardsRelations = relations(feedbackBoards, ({ one }) => ({
	project: one(projects, {
		fields: [feedbackBoards.projectId],
		references: [projects.id],
	}),
}));
