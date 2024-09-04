import { relations, sql } from 'drizzle-orm';
import { json, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../_shared';
import { users } from '../auth/users.table';
import { boards } from '../boards/boards.table';
import { feedbackComments } from './comments/feedback-comments.table';
import { feedbackAssignments } from './feedback-assignments.table';
import { feedbackUpdates } from './feedback-updates.table';
import { feedbackVotes } from './feedback-votes.table';

export const feedback = pgTable('feedback', {
	...defaultColumns(),
	boardId: varchar('board_id', {
		length: 255,
	}).notNull(),
	teamId: varchar('team_id', {
		length: 255,
	}).notNull(),
	creatorUserId: varchar('creator_user_id', {
		length: 255,
	}).notNull(),
	assignedUserId: varchar('assigned_user_id', {
		length: 255,
	}),
	title: varchar('title', {
		length: 255,
	}).notNull(),
	description: varchar('description', {
		length: 3072,
	}).notNull(),
	eta: timestamp('created_at'),
	status: json('status')
		.$type<string[]>()
		.default(sql`'["review"]'`)
		.notNull(),
});

export const feedbackRelations = relations(feedback, ({ one, many }) => ({
	board: one(boards, {
		fields: [feedback.boardId],
		references: [boards.id],
		relationName: 'boards_feedback',
	}),
	creatorUser: one(users, {
		fields: [feedback.creatorUserId],
		references: [users.id],
		relationName: 'users_feedback_created',
	}),
	assignedUser: many(feedbackAssignments, {
		relationName: 'feedback_feedbackAssignments',
	}),
	votes: many(feedbackVotes, {
		relationName: 'feedback_feedbackVotes',
	}),
	comments: many(feedbackComments, {
		relationName: 'feedback_feedbackComments',
	}),
	updates: many(feedbackUpdates, {
		relationName: 'feedback_feedbackUpdates',
	}),
}));
