import type { Refine } from 'drizzle-zod';
import type { z } from 'zod';

import { relations } from 'drizzle-orm';
import { integer, pgTable, unique, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

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
	}),
	feedback: one(feedback, {
		fields: [feedbackVotes.feedbackId],
		references: [feedback.id],
	}),
}));

const refineSchema = {
	vote: ({ vote }) => vote.min(-1).max(1),
} satisfies Refine<typeof feedbackVotes, 'select'>;

export const selectFeedbackVotesSchema = createSelectSchema(feedbackVotes, refineSchema);
export const mutateFeedbackVotesSchema = createInsertSchema(feedbackVotes, refineSchema);
export const seedFeedbackVotesSchema = createInsertSchema(feedbackVotes, refineSchema);

export type SelectFeedbackVotesSchema = z.infer<typeof selectFeedbackVotesSchema>;
export type MutateFeedbackVotesSchema = z.infer<typeof mutateFeedbackVotesSchema>;
export type SeedFeedbackVotesSchema = z.infer<typeof seedFeedbackVotesSchema>;
