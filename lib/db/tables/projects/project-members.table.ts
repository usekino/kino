import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../_shared';
import { users } from '../auth/users.table';
import { projects } from './projects.table';

export const projectMembers = pgTable('project_members', {
	// Defaults
	...defaultColumns(),
	projectId: varchar('project_id', {
		length: 255,
	}).notNull(),
	userId: varchar('user_id', {
		length: 255,
	}).notNull(),
	userRole: varchar('user_role', {
		length: 255,
	}).notNull(),
});

export const projectMembersRelations = relations(projectMembers, ({ one }) => ({
	user: one(users, {
		fields: [projectMembers.userId],
		references: [users.id],
		relationName: 'users_projectMembers',
	}),
	project: one(projects, {
		fields: [projectMembers.projectId],
		references: [projects.id],
		relationName: 'projectMembers_project',
	}),
}));
