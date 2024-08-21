import { relations, sql } from 'drizzle-orm';
import { json, pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../_shared';
import { users } from '../lucia/users.table';
// import { projects } from '../projects.table';
import { teams } from '../teams.table';
import { feedbackBoards } from './feedback-boards.table';
import { feedbackVotes } from './feedback-votes.table';

export const feedback = pgTable('feedback', {
	...defaultColumns(),
	//
	teamId: varchar('team_id', {
		length: 255,
	}).notNull(),
	userOwner: varchar('user_owner', {
		length: 255,
	}).notNull(),
	userAssigned: varchar('user_assigned', {
		length: 255,
	}),
	// projectId: varchar('project_id', {
	// 	length: 255,
	// }).notNull(),
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

export const feedbackRelations = relations(feedback, ({ one, many }) => ({
	userOwner: one(users, {
		fields: [feedback.userOwner],
		references: [users.id],
		relationName: 'user_owner_feedback',
	}),
	userAssigned: one(users, {
		fields: [feedback.userAssigned],
		references: [users.id],
		relationName: 'user_assigned_feedback',
	}),
	team: one(teams, {
		fields: [feedback.teamId],
		references: [teams.id],
		relationName: 'team_feedback',
	}),
	// project: one(projects, {
	// 	fields: [feedback.projectId],
	// 	references: [projects.id],
	// 	relationName: 'project_feedback',
	// }),
	board: one(feedbackBoards, {
		fields: [feedback.boardId],
		references: [feedbackBoards.id],
		relationName: 'feedback_board',
	}),
	votes: many(feedbackVotes, {
		relationName: 'feedback_votes',
	}),
}));
