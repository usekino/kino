import type { Refine } from 'drizzle-zod';

import { relations, sql } from 'drizzle-orm';
import { json, pgTable, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { defaultColumns } from '../_shared';
import { users } from '../lucia/users.table';
import { projects } from '../projects.table';
import { teams } from '../teams.table';
import { feedbackBoards } from './feedback-boards.table';

export const feedback = pgTable('feedback', {
	...defaultColumns(),
	//
	userId: varchar('user_id', {
		length: 255,
	}).notNull(),
	teamId: varchar('team_id', {
		length: 255,
	}).notNull(),
	assignedTo: varchar('assigned_to', {
		length: 255,
	}),
	projectId: varchar('project_id', {
		length: 255,
	}).notNull(),
	boardId: varchar('board_id', {
		length: 255,
	}).notNull(),
	//
	title: varchar('title', {
		length: 255,
	}).notNull(),
	description: varchar('description', {
		length: 3072,
	}).notNull(),
	status: json('status')
		.$type<string[]>()
		.default(sql`'["planned"]'`)
		.notNull(),
});

export const feedbackRelations = relations(feedback, ({ one }) => ({
	user: one(users, {
		fields: [feedback.userId],
		references: [users.id],
	}),
	assignedTo: one(users, {
		fields: [feedback.assignedTo],
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
export const seedFeedbackSchema = createInsertSchema(feedback, refineSchema);

export type SelectFeedbackSchema = z.infer<typeof selectFeedbackSchema>;
export type MutateFeedbackSchema = z.infer<typeof mutateFeedbackSchema>;
export type SeedFeedbackSchema = z.infer<typeof seedFeedbackSchema>;
