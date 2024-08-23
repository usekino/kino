import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../_shared';
import { users } from '../users.table';
import { projects } from './projects.table';

export const projectUsers = pgTable('project_users', {
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

export const projectUsersRelations = relations(projectUsers, ({ one }) => ({
	user: one(users, {
		fields: [projectUsers.userId],
		references: [users.id],
		relationName: 'users_projectUsers',
	}),
	project: one(projects, {
		fields: [projectUsers.projectId],
		references: [projects.id],
		relationName: 'projectUsers_project',
	}),
}));
