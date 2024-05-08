import type { Refine } from 'drizzle-zod';
import type { z } from 'zod';

import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { schemaDefaults } from '../_shared';
import { users } from '../users-table';
import { feedback } from './feedback.table';

export const feedbackVotes = pgTable('feedback_votes', {
	id: serial('id').notNull().primaryKey(),
	createdAt: timestamp('created_at').default(schemaDefaults.currentTimestamp).notNull(),
	updatedAt: timestamp('updated_at').default(schemaDefaults.currentTimestamp).notNull(),
	deletedAt: timestamp('deleted_at'),
	updates: integer('updates').default(0).notNull(),
	//
	feedbackId: serial('feedback_id').notNull(),
	userId: serial('user_id').notNull(),
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

export type SelectFeedbackVotesSchema = z.infer<typeof selectFeedbackVotesSchema>;
export type MutateFeedbackVotesSchema = z.infer<typeof mutateFeedbackVotesSchema>;
