import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from './_shared';
import { feedback } from './feedback/feedback.table';
import { xUsersTeams } from './join/x-users-teams.table';
import { users } from './lucia/users.table';
import { projects } from './projects.table';

export const teams = pgTable('teams', {
	// Defaults
	...defaultColumns(),
	//
	name: varchar('name', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	description: varchar('description', { length: 3072 }),
	ownerId: varchar('owner_id', {
		length: 255,
	}).notNull(),
});

export const teamRelations = relations(teams, ({ one, many }) => ({
	owner: one(users, {
		fields: [teams.ownerId],
		references: [users.id],
		relationName: 'owner',
	}),
	members: many(xUsersTeams, {
		relationName: 'userTeamToTeam',
	}),
	projects: many(projects, {
		relationName: 'team_projects',
	}),
	feedback: many(feedback, {
		relationName: 'feedback',
	}),
}));
