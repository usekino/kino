import { relations, sql } from 'drizzle-orm';
import { integer, json, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema, Refine } from 'drizzle-zod';
import { z } from 'zod';

import { schemaDefaults } from './_shared';
import { users } from './users-table';

export const teams = pgTable('teams', {
	// Defaults
	id: varchar('id', { length: 255 }).unique().default(schemaDefaults.id).notNull().primaryKey(),
	createdAt: timestamp('created_at').default(schemaDefaults.currentTimestamp).notNull(),
	updatedAt: timestamp('updated_at').default(schemaDefaults.currentTimestamp).notNull(),
	deletedAt: timestamp('deleted_at'),
	updates: integer('updates').default(0).notNull(),
	//
	name: varchar('name', { length: 255 }).notNull(),
	description: varchar('description', { length: 3072 }),
	ownerId: varchar('owner_id', {
		length: 255,
	}).notNull(),
	members: json('members').$type<string[]>().notNull(),
	githubUrl: varchar('github_url', { length: 255 }),
});

export const teamRelations = relations(teams, ({ one, many }) => ({
	owner: one(users, {
		fields: [teams.ownerId],
		references: [users.id],
	}),
	members: many(users),
}));

const refineSchema = {
	name: ({ name }) => name.min(3).max(50),
	description: ({ description }) => description.max(300),
	members: () => z.array(z.string()).min(1).max(3),
	githubUrl: ({ githubUrl }) => githubUrl.url(),
} satisfies Refine<typeof teams, 'select'>;

export const selectTeamSchema = createSelectSchema(teams, refineSchema);
export const mutateTeamSchema = createInsertSchema(teams, refineSchema).omit({
	id: true,
	createdAt: true,
});

export type SelectTeamSchema = z.infer<typeof selectTeamSchema>;
export type MutateTeamSchema = z.infer<typeof mutateTeamSchema>;
