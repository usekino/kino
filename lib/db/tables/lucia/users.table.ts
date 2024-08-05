import type { Refine } from 'drizzle-zod';

import { relations, sql } from 'drizzle-orm';
import { index, integer, json, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { schemaDefaults } from '../_shared';
import { authentications } from '../authentications.table';
import { xUsersProjects } from '../join/x-users-projects.table';
import { xUsersTeams } from '../join/x-users-teams.table';
import { sessions } from './sessions.table';

// ⚠️ Note: this table differs from the rest of the non-auth tables
// because it's managed by Lucia, and it has specific requirements, on how
// the database it structured.

export const users = pgTable(
	'users',
	{
		id: varchar('id', { length: 255 }).unique().notNull(),
		privateId: serial('private_id').notNull().primaryKey(),
		createdAt: timestamp('created_at').default(schemaDefaults.currentTimestamp).notNull(),
		updatedAt: timestamp('updated_at').default(schemaDefaults.currentTimestamp).notNull(),
		deletedAt: timestamp('deleted_at'),
		updates: integer('updates').default(0).notNull(),
		//
		username: varchar('username', { length: 255 }).notNull().unique(),
		email: varchar('email', { length: 255 }).notNull().unique(),
		emailVerifiedAt: timestamp('email_verified_at')
			.default(sql`null`)
			.$type<Date | null>(),
		avatar: varchar('avatar', { length: 255 }),
		bio: varchar('bio', { length: 3072 }),
		name: varchar('name', { length: 255 }),
		role: json('role')
			.default(sql`'["member"]'`)
			.notNull(),
		latestAgreement: timestamp('latest_terms')
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
	},
	(table) => {
		return {
			idIdx: index('user_id_idx').on(table.id),
			usernameIdx: index('user_username_idx').on(table.username),
		};
	}
);

export const userRelations = relations(users, ({ many, one }) => ({
	authentications: one(authentications, {
		fields: [users.id],
		references: [authentications.userId],
		relationName: 'authentications',
	}),
	sessions: many(sessions, {
		relationName: 'sessions',
	}),
	teams: many(xUsersTeams, {
		relationName: 'userTeamToUser',
	}),
	projects: many(xUsersProjects, {
		relationName: 'projects',
	}),
}));

const refineSchema = {
	username: ({ username }) => username.min(3).max(100),
	email: ({ email }) => email.email(),
	name: ({ name }) => name.max(255),
	role: () => z.array(z.enum(['member', 'admin', 'beta'])),
	bio: ({ bio }) => bio.max(450),
	updates: ({ updates }) => updates.min(0),
	avatar: ({ avatar }) => avatar.url(),
} satisfies Refine<typeof users, 'select'>;

export const selectUserSchema = createSelectSchema(users, refineSchema);
export const mutateUserSchema = createInsertSchema(users, refineSchema).omit({
	createdAt: true,
});
export const seedUserSchema = createInsertSchema(users, refineSchema);

export type SelectUserSchema = z.infer<typeof selectUserSchema>;
export type MutateUserSchema = z.infer<typeof mutateUserSchema>;
export type SeedUserSchema = z.infer<typeof seedUserSchema>;
