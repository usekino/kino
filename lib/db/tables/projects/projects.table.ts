import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../_shared';
import { boards } from '../boards/boards.table';
import { teams } from '../teams/teams.table';
import { projectMembers } from './project-members.table';

export const projects = pgTable('projects', {
	...defaultColumns(),
	name: varchar('name', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	description: varchar('description', { length: 3072 }),
	teamId: varchar('team_id').notNull(),
	websiteUrl: varchar('website_url', { length: 255 }),
	// ssoUrl: varchar('sso_url', { length: 255 }),
});

export const projectRelations = relations(projects, ({ one, many }) => ({
	team: one(teams, {
		fields: [projects.teamId],
		references: [teams.id],
		relationName: 'teams_projects',
	}),
	boards: many(boards, {
		relationName: 'boards_projects',
	}),
	members: many(projectMembers, {
		relationName: 'projectMembers_project',
	}),
}));
