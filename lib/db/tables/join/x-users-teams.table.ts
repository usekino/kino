import type { Refine } from 'drizzle-zod';

import { relations } from 'drizzle-orm';
import { jsonb, pgTable, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { defaultColumns } from '../_shared';
import { users } from '../lucia/users.table';
import { teams } from '../teams.table';

export const xUsersTeams = pgTable('x_users_teams', {
	// Default
	...defaultColumns(),
	//
	userId: varchar('user_id', {
		length: 255,
	}).notNull(),
	teamId: varchar('team_id', {
		length: 255,
	}).notNull(),
	//
	userRole: jsonb('user_role').$type<string[]>().default(['member']).notNull(),
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
