import { relations, sql } from 'drizzle-orm';
import { jsonb, pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../_shared';
import { users } from '../auth/users.table';
import { teams } from './teams.table';

export const teamMembers = pgTable('team_members', {
	...defaultColumns(),
	userId: varchar('user_id', {
		length: 255,
	})
		.notNull()
		.references(() => users.id, {
			onDelete: 'cascade',
		}),
	teamId: varchar('team_id', {
		length: 255,
	})
		.notNull()
		.references(() => teams.id, {
			onDelete: 'cascade',
		}),
	userRole: jsonb('user_role')
		.default(sql`'["member"]'`)
		.notNull(),
});

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
	user: one(users, {
		fields: [teamMembers.userId],
		references: [users.id],
		relationName: 'users_teamMembers',
	}),
	team: one(teams, {
		fields: [teamMembers.teamId],
		references: [teams.id],
		relationName: 'teams_teamMembers',
	}),
}));
