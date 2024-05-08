import { relations } from 'drizzle-orm';
import { integer, jsonb, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import type { Refine } from 'drizzle-zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { schemaDefaults } from './_shared';
import { projects } from './projects-table';
import { users } from './users-table';

export const xUsersProjects = pgTable('x_users_projects', {
	// Default
	id: varchar('id', { length: 255 }).unique().default(schemaDefaults.id).notNull().primaryKey(),
	createdAt: timestamp('created_at').default(schemaDefaults.currentTimestamp).notNull(),
	updatedAt: timestamp('updated_at').default(schemaDefaults.currentTimestamp).notNull(),
	deletedAt: timestamp('deleted_at'),
	updates: integer('updates').default(0).notNull(),
	//
	userId: varchar('user_id', {
		length: 255,
	}).notNull(),
	userRole: jsonb('user_role').$type<string[]>().default(['member']).notNull(),
	projectId: varchar('team_id', {
		length: 255,
	}).notNull(),
});

export const xUsersProjectsRelations = relations(xUsersProjects, ({ one }) => ({
	user: one(users, {
		fields: [xUsersProjects.userId],
		references: [users.id],
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
