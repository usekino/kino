import type { Refine } from 'drizzle-zod';

import { relations } from 'drizzle-orm';
import { jsonb, pgTable, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { defaultColumns } from '../_shared';
import { users } from '../lucia/users.table';
import { projects } from '../projects.table';

export const xUsersProjects = pgTable('x_users_projects', {
	// Defaults
	...defaultColumns(),
	//
	userId: varchar('user_id', {
		length: 255,
	}).notNull(),
	projectId: varchar('team_id', {
		length: 255,
	}).notNull(),
	//
	userRole: jsonb('user_role').$type<string[]>().default(['member']).notNull(),
});

export const xUsersProjectsRelations = relations(xUsersProjects, ({ one }) => ({
	user: one(users, {
		fields: [xUsersProjects.userId],
		references: [users.privateId],
		relationName: 'user',
	}),
	project: one(projects, {
		fields: [xUsersProjects.projectId],
		references: [projects.id],
		relationName: 'projects',
	}),
}));

const refineSchema = {
	userRole: () => z.array(z.enum(['member', 'admin', 'blocked'])),
} satisfies Refine<typeof xUsersProjects, 'select'>;

export const selectXUsersProjectsSchema = createSelectSchema(xUsersProjects, refineSchema);
export const mutateXUsersProjectsSchema = createInsertSchema(xUsersProjects, refineSchema).omit({
	id: true,
	createdAt: true,
});

export type SelectXUsersProjectsSchema = z.infer<typeof selectXUsersProjectsSchema>;
export type MutateXUsersProjectsSchema = z.infer<typeof mutateXUsersProjectsSchema>;
