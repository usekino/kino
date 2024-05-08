import type { Refine } from 'drizzle-zod';

import { relations, sql } from 'drizzle-orm';
import { integer, json, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { schemaDefaults } from '../_shared';
import { projects } from '../projects-table';
import { teams } from '../teams-table';
import { users } from '../users-table';
import { feedbackBoards } from './feedback-boards.table';

export const feedback = pgTable('feedback', {
	id: serial('id').notNull().primaryKey(),
	createdAt: timestamp('created_at').default(schemaDefaults.currentTimestamp).notNull(),
	updatedAt: timestamp('updated_at').default(schemaDefaults.currentTimestamp).notNull(),
	deletedAt: timestamp('deleted_at'),
	updates: integer('updates').default(0).notNull(),
	//
	userId: serial('user_id').notNull(),
	teamId: serial('team_id').notNull(),
	projectId: serial('project_id').notNull(),
	boardId: serial('board_id').notNull(),
	//
	title: varchar('title', {
		length: 255,
	}).notNull(),
	description: varchar('description', {
		length: 3072,
	}).notNull(),
	status: json('status')
		.$type<string[]>()
		.default(sql`'["pending"]'`)
		.notNull(),
});

export const feedbackRelations = relations(feedback, ({ one }) => ({
	user: one(users, {
		fields: [feedback.userId],
		references: [users.id],
	}),
	team: one(teams, {
		fields: [feedback.teamId],
		references: [teams.id],
	}),
	project: one(projects, {
		fields: [feedback.projectId],
		references: [projects.id],
	}),
	board: one(feedbackBoards, {
		fields: [feedback.boardId],
		references: [feedbackBoards.id],
	}),
}));

const refineSchema = {
	title: ({ title }) => title.min(3).max(120),
	description: ({ description }) => description.max(1500),
	status: () => z.array(z.string()),
	boardId: () => z.string().min(3),
} satisfies Refine<typeof feedback, 'select'>;

export const selectFeedbackSchema = createSelectSchema(feedback, refineSchema);
export const mutateFeedbackSchema = createInsertSchema(feedback, refineSchema);

export type SelectFeedbackSchema = z.infer<typeof selectFeedbackSchema>;
export type MutateFeedbackSchema = z.infer<typeof mutateFeedbackSchema>;
