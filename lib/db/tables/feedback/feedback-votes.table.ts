import { relations } from 'drizzle-orm';
import { integer, pgTable, unique, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../_shared';
import { users } from '../lucia/users.table';
import { feedback } from './feedback.table';

export const feedbackVotes = pgTable(
	'feedback_votes',
	{
		...defaultColumns(),
		//
		feedbackId: varchar('feedback_id', {
			length: 255,
		}).notNull(),
		userId: varchar('user_id', {
			length: 255,
		}).notNull(),
		//
		vote: integer('vote').notNull(),
	},
	(table) => ({
		uniqueConstraint: unique('unique_feedback_user').on(table.feedbackId, table.userId),
	})
);

export const feedbackVotesRelations = relations(feedbackVotes, ({ one }) => ({
	user: one(users, {
		fields: [feedbackVotes.userId],
		references: [users.id],
		relationName: 'user_votes',
	}),
	feedback: one(feedback, {
		fields: [feedbackVotes.feedbackId],
		references: [feedback.id],
		relationName: 'feedback_votes',
	}),
}));
