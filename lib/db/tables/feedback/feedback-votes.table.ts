import { relations } from 'drizzle-orm';
import { integer, pgTable, unique, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../_shared';
import { feedbackUsers } from './feedback-users.table';
import { feedback } from './feedback.table';

export const feedbackVotes = pgTable(
	'feedback_votes',
	{
		...defaultColumns(),
		feedbackId: varchar('feedback_id', {
			length: 255,
		}).notNull(),
		voterId: varchar('user_id', {
			length: 255,
		}).notNull(),
		vote: integer('vote').notNull(),
	},
	(table) => ({
		uniqueConstraint: unique('unique_feedback_user').on(table.feedbackId, table.voterId),
	})
);

export const feedbackVotesRelations = relations(feedbackVotes, ({ one }) => ({
	feedback: one(feedback, {
		fields: [feedbackVotes.feedbackId],
		references: [feedback.id],
		relationName: 'feedback_feedbackVotes',
	}),
	voterUser: one(feedbackUsers, {
		fields: [feedbackVotes.voterId],
		references: [feedbackUsers.id],
		relationName: 'feedbackVotes_feedbackUsers',
	}),
}));
