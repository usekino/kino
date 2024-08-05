import type { Refine } from 'drizzle-zod';

import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { defaultColumns } from '../_shared';
import { users } from '../lucia/users.table';
import { feedback } from './feedback.table';

export const feedbackComments = pgTable('feedback_comments', {
	...defaultColumns(),
	//
	feedbackId: varchar('feedback_id', {
		length: 255,
	}).notNull(),
	userId: varchar('user_id', {
		length: 255,
	}).notNull(),
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
export const seedFeedbackCommentsSchema = createInsertSchema(feedbackComments, refineSchema);

export type SelectFeedbackCommentsSchema = z.infer<typeof selectFeedbackCommentsSchema>;
export type MutateFeedbackCommentsSchema = z.infer<typeof mutateFeedbackCommentsSchema>;
export type SeedFeedbackCommentsSchema = z.infer<typeof seedFeedbackCommentsSchema>;
