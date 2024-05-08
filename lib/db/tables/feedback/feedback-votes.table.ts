import type { Refine } from 'drizzle-zod';
import type { z } from 'zod';

import { relations } from 'drizzle-orm';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { defaultColumns } from '../_shared';
import { users } from '../lucia/users.table';
import { feedback } from './feedback.table';

export const feedbackVotes = pgTable('feedback_votes', {
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
});

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

const selectFeedbackSchemaTest = selectFeedbackVotesSchema.shape.id;

selectFeedbackSchemaTest;

export type SelectFeedbackVotesSchema = z.infer<typeof selectFeedbackVotesSchema>;
export type MutateFeedbackVotesSchema = z.infer<typeof mutateFeedbackVotesSchema>;
