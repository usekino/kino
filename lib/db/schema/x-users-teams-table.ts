import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';

import { schemaDefaults } from './_shared';
import { teams } from './teams-table';
import { users } from './users-table';

export const xUsersTeams = pgTable('x_users_teams', {
	id: varchar('id', { length: 255 }).unique().default(schemaDefaults.id).notNull().primaryKey(),
	userId: varchar('user_id', {
		length: 255,
	}).notNull(),
	teamId: varchar('team_id', {
		length: 255,
	}).notNull(),
});

export const xUsersTeamsRelations = relations(xUsersTeams, ({ one }) => ({
	user: one(users, {
		fields: [xUsersTeams.userId],
		references: [users.id],
	}),
	team: one(teams, {
		fields: [xUsersTeams.teamId],
		references: [teams.id],
	}),
}));
