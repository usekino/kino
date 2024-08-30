import { relations } from 'drizzle-orm';
import { jsonb, pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../_shared';
import { users } from '../auth/users.table';
import { teams } from './teams.table';

export const teamMembers = pgTable('team_members', {
	...defaultColumns(),
	userId: varchar('user_id', {
		length: 255,
	}).notNull(),
	teamId: varchar('team_id', {
		length: 255,
	}).notNull(),
	userRole: jsonb('user_role').$type<string[]>().default(['member']).notNull(),
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
