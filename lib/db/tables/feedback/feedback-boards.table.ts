import type { Refine } from 'drizzle-zod';
import type { z } from 'zod';

import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { schemaDefaults } from '../_shared';
import { projects } from '../projects.table';

export const feedbackBoards = pgTable('feedback_boards', {
	id: serial('id').notNull().primaryKey(),
	createdAt: timestamp('created_at').default(schemaDefaults.currentTimestamp).notNull(),
	updatedAt: timestamp('updated_at').default(schemaDefaults.currentTimestamp).notNull(),
	deletedAt: timestamp('deleted_at'),
	updates: integer('updates').default(0).notNull(),
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
	projectId: one(projects, {
		fields: [feedbackBoards.projectId],
		references: [projects.id],
	}),
}));

const refineSchema = {} satisfies Refine<typeof feedbackBoards, 'select'>;

export const selectFeedbackBoardsSchema = createSelectSchema(feedbackBoards, refineSchema);
export const mutateFeedbackBoardsSchema = createInsertSchema(feedbackBoards, refineSchema);

export type SelectFeedbackBoardsSchema = z.infer<typeof selectFeedbackBoardsSchema>;
export type MutateFeedbackBoardsSchema = z.infer<typeof mutateFeedbackBoardsSchema>;
