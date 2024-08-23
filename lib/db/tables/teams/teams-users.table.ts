import type { Refine } from 'drizzle-zod';

import { relations } from 'drizzle-orm';
import { jsonb, pgTable, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { defaultColumns } from '../_shared';
import { users } from '../users.table';
import { teams } from './teams.table';

export const teamUsers = pgTable('team_users', {
	...defaultColumns(),
	userId: varchar('user_id', {
		length: 255,
	}).notNull(),
	teamId: varchar('team_id', {
		length: 255,
	}).notNull(),
	userRole: jsonb('user_role').$type<string[]>().default(['member']).notNull(),
});

export const teamUsersRelations = relations(teamUsers, ({ one }) => ({
	user: one(users, {
		fields: [teamUsers.userId],
		references: [users.id],
		relationName: 'users_teamUsers',
	}),
	team: one(teams, {
		fields: [teamUsers.teamId],
		references: [teams.id],
		relationName: 'teams_teamUsers',
	}),
}));

const refineSchema = {
	userRole: () => z.array(z.enum(['member', 'admin', 'blocked'])),
} satisfies Refine<typeof teamUsers, 'select'>;

export const selectXUsersTeamsSchema = createSelectSchema(teamUsers, refineSchema);
export const mutateXUsersTeamsSchema = createInsertSchema(teamUsers, refineSchema).omit({
	id: true,
	createdAt: true,
});
export const seedXUsersTeamsSchema = createInsertSchema(teamUsers, refineSchema);

export type SelectXUsersTeamsSchema = z.infer<typeof selectXUsersTeamsSchema>;
export type MutateXUsersTeamsSchema = z.infer<typeof mutateXUsersTeamsSchema>;
export type SeedXUsersTeamsSchema = z.infer<typeof seedXUsersTeamsSchema>;
