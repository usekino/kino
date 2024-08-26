import { relations } from 'drizzle-orm';
import { jsonb, pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../_shared';
import { users } from '../users.table';
import { feedbackCommentsReactions } from './comments/feedback-comments-reactions.table';
import { feedbackComments } from './comments/feedback-comments.table';
import { feedbackVotes } from './feedback-votes.table';
import { feedback } from './feedback.table';

export const feedbackUsers = pgTable('feedback_users', {
	...defaultColumns(),
	userId: varchar('user_id', {
		length: 255,
	}).notNull(),
	feedbackId: varchar('feedback_id', {
		length: 255,
	}).notNull(),
	userRoles: jsonb('user_roles').$type<string[]>().default(['member']).notNull(),
});

export const feedbackUsersRelations = relations(feedbackUsers, ({ one, many }) => ({
	user: one(users, {
		fields: [feedbackUsers.userId],
		references: [users.id],
		relationName: 'users_feedbackUsers',
	}),
	feedback: one(feedback, {
		fields: [feedbackUsers.feedbackId],
		references: [feedback.id],
		relationName: 'feedback_feedbackUsers',
	}),
	feedbackReactions: many(feedbackCommentsReactions, {
		relationName: 'feedbackUsers_feedbackCommentsReactions',
	}),
	feedbackVotes: many(feedbackVotes, {
		relationName: 'feedbackVotes_feedbackUsers',
	}),
	feedbackComments: many(feedbackComments, {
		relationName: 'feedbackComments_feedbackUsers',
	}),
}));
