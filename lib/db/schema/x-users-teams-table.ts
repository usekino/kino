import { relations } from 'drizzle-orm';
import { integer, jsonb, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import type { Refine } from 'drizzle-zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { schemaDefaults } from './_shared';
import { teams } from './teams-table';
import { users } from './users-table';

export const xUsersTeams = pgTable('x_users_teams', {
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
	teamId: varchar('team_id', {
		length: 255,
	}).notNull(),
});

export const xUsersTeamsRelations = relations(xUsersTeams, ({ one }) => ({
	user: one(users, {
		fields: [xUsersTeams.userId],
		references: [users.id],
		relationName: 'user',
	}),
	team: one(teams, {
		fields: [xUsersTeams.teamId],
		references: [teams.id],
		relationName: 'team',
	}),
}));

const refineSchema = {
	userRole: () => z.array(z.enum(['member', 'admin', 'blocked'])),
} satisfies Refine<typeof xUsersTeams, 'select'>;

export const selectXUsersTeamsSchema = createSelectSchema(xUsersTeams, refineSchema);
export const mutateXUsersTeamsSchema = createInsertSchema(xUsersTeams, refineSchema).omit({
	id: true,
	createdAt: true,
});

export type SelectXUsersTeamsSchema = z.infer<typeof selectXUsersTeamsSchema>;
export type MutateXUsersTeamsSchema = z.infer<typeof mutateXUsersTeamsSchema>;
