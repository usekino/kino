import type { Refine } from 'drizzle-zod';

import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { schemaDefaults } from '../_shared';
import { users } from '../users-table';
import { feedback } from './feedback.table';

export const feedbackComments = pgTable('feedback_comments', {
	id: serial('id').notNull().primaryKey(),
	createdAt: timestamp('created_at').default(schemaDefaults.currentTimestamp).notNull(),
	updatedAt: timestamp('updated_at').default(schemaDefaults.currentTimestamp).notNull(),
	deletedAt: timestamp('deleted_at'),
	updates: integer('updates').default(0).notNull(),
	//
	feedbackId: serial('feedback_id').notNull(),
	userId: serial('user_id').notNull(),
	//
	content: varchar('content', {
		length: 3072,
	}).notNull(),
});

export const feedbackCommentsRelations = relations(feedbackComments, ({ one }) => ({
	user: one(users, {
		fields: [feedbackComments.userId],
		references: [users.id],
	}),
	feedback: one(feedback, {
		fields: [feedbackComments.feedbackId],
		references: [feedback.id],
	}),
}));

const refineSchema = {
	content: ({ content }) => content.max(1500),
} satisfies Refine<typeof feedbackComments, 'select'>;

export const selectFeedbackCommentsSchema = createSelectSchema(feedbackComments, refineSchema);
export const mutateFeedbackCommentsSchema = createInsertSchema(feedbackComments, refineSchema);

export type SelectFeedbackCommentsSchema = typeof selectFeedbackCommentsSchema;
export type MutateFeedbackCommentsSchema = typeof mutateFeedbackCommentsSchema;
