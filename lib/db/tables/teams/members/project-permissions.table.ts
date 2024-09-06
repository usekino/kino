import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../../_shared';
import { projects } from '../../projects/projects.table';
import { teamMembers } from '../team-members.table';

export const projectPermissions = pgTable('team_members_project_permissions', {
	...defaultColumns(),
	projectId: varchar('project_id', {
		length: 255,
	}).notNull(),
	teamMemberId: varchar('team_id', {
		length: 255,
	}).notNull(),
	userRole: varchar('user_role', {
		length: 255,
	}).notNull(),
});

export const projectPermissionsRelations = relations(projectPermissions, ({ one }) => ({
	project: one(projects, {
		fields: [projectPermissions.projectId],
		references: [projects.id],
		relationName: 'teams_projectPermissions',
	}),
	teamMember: one(teamMembers, {
		fields: [projectPermissions.teamMemberId],
		references: [teamMembers.id],
		relationName: 'teams_projectPermissions',
	}),
}));
