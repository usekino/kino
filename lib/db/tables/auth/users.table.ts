import { relations, sql } from 'drizzle-orm';
import { index, integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

import { defaults } from '../_shared';
import { feedbackAssignments } from '../feedback/feedback-assignments.table';
import { feedback } from '../feedback/feedback.table';
import { projectMembers } from '../projects/project-members.table';
import { teamMembers } from '../teams/team-members.table';
import { authentications } from './authentications.table';
import { sessions } from './sessions.table';

// ⚠️ Note: this table differs from the rest of th1e non-auth tables
// because it's managed by Lucia, and it has specific requirements, on how
// the database it structured.
export const users = pgTable(
	'users',
	{
		id: varchar('id', { length: 255 }).unique().notNull(),
		privateId: serial('private_id').notNull().primaryKey(),
		createdAt: timestamp('created_at').default(defaults.currentTimestamp).notNull(),
		updatedAt: timestamp('updated_at').default(defaults.currentTimestamp).notNull(),
		deletedAt: timestamp('deleted_at'),
		updates: integer('updates').default(0).notNull(),
		//
		username: varchar('username', { length: 255 }).notNull().unique(),
		email: varchar('email', { length: 255 }).notNull().unique(),
		emailVerifiedAt: timestamp('email_verified_at')
			.default(sql`null`)
			.$type<Date | null>(),
		avatar: varchar('avatar', { length: 255 }),
		bio: varchar('bio', { length: 3072 }),
		name: varchar('name', { length: 255 }),
		latestAgreement: timestamp('latest_terms')
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
	},
	(table) => {
		return {
			idIdx: index('user_id_idx').on(table.id),
			usernameIdx: index('user_username_idx').on(table.username),
		};
	}
);

export const userRelations = relations(users, ({ many, one }) => ({
	authentications: one(authentications, {
		fields: [users.id],
		references: [authentications.userId],
		relationName: 'users_authentications',
	}),
	sessions: many(sessions, {
		relationName: 'users_sessions',
	}),
	teamMember: many(teamMembers, {
		relationName: 'users_teamMembers',
	}),
	projectMember: many(projectMembers, {
		relationName: 'users_projectMembers',
	}),
	createdFeedback: many(feedback, {
		relationName: 'users_feedback_created',
	}),
	assignedFeedback: many(feedbackAssignments, {
		relationName: 'users_feedbackAssignments',
	}),
}));
