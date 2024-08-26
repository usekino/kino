import { relations } from 'drizzle-orm';
import { jsonb, pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../_shared';
import { users } from '../users.table';
import { teams } from './teams.table';

export const teamUsers = pgTable('team_users', {
	...defaultColumns(),
	userId: varchar('user_id', {
		length: 255,
	}).notNull(),
	teamId: varchar('team_id', {
		length: 255,
	}).notNull(),
	userRole: jsonb('user_role').$type<string[]>().default(['member']).notNull(),
});

export const teamUsersRelations = relations(teamUsers, ({ one }) => ({
	user: one(users, {
		fields: [teamUsers.userId],
		references: [users.id],
		relationName: 'users_teamUsers',
	}),
	team: one(teams, {
		fields: [teamUsers.teamId],
		references: [teams.id],
		relationName: 'teams_teamUsers',
	}),
}));
