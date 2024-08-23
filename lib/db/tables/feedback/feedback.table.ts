import { relations, sql } from 'drizzle-orm';
import { json, pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../_shared';
import { boardsFeedback } from '../boards/boards-feedback.table';
import { feedbackComments } from './comments/feedback-comments.table';
import { feedbackUpdates } from './feedback-updates.table';
import { feedbackUsers } from './feedback-users.table';
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
	status: json('status')
		.$type<string[]>()
		.default(sql`'["planned"]'`)
		.notNull(),
});

export const feedbackRelations = relations(feedback, ({ one, many }) => ({
	board: many(boardsFeedback, {
		relationName: 'boardsFeedback_feedback',
	}),
	creatorUser: one(feedbackUsers, {
		fields: [feedback.creatorUserId],
		references: [feedbackUsers.userId],
	}),
	assignedUser: one(feedbackUsers, {
		fields: [feedback.assignedUserId],
		references: [feedbackUsers.userId],
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
