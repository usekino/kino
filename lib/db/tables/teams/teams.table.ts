import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../_shared';
import { projects } from '../projects/projects.table';
import { teamUsers } from './teams-users.table';

export const teams = pgTable('teams', {
	...defaultColumns(),
	name: varchar('name', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	description: varchar('description', { length: 3072 }),
	ownerId: varchar('owner_id', {
		length: 255,
	}).notNull(),
});

export const teamRelations = relations(teams, ({ many }) => ({
	users: many(teamUsers, {
		relationName: 'teams_teamUsers',
	}),
	projects: many(projects, {
		relationName: 'teams_projects',
	}),
}));