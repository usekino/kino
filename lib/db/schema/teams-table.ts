import badwords from '@heyooo-inc/reserved-subdomains/badwords.json';
import names from '@heyooo-inc/reserved-subdomains/names.json';
import web from '@heyooo-inc/reserved-subdomains/web.json';
import { relations } from 'drizzle-orm';
import { integer, json, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema, Refine } from 'drizzle-zod';
import { z } from 'zod';

import { schemaDefaults } from './_shared';
import { users } from './users-table';
import { xUsersTeams } from './x-users-teams-table';

export const teams = pgTable('teams', {
	// Defaults
	id: varchar('id', { length: 255 }).unique().default(schemaDefaults.id).notNull().primaryKey(),
	createdAt: timestamp('created_at').default(schemaDefaults.currentTimestamp).notNull(),
	updatedAt: timestamp('updated_at').default(schemaDefaults.currentTimestamp).notNull(),
	deletedAt: timestamp('deleted_at'),
	updates: integer('updates').default(0).notNull(),
	//
	name: varchar('name', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
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
		relationName: 'ownerId',
	}),
	members: many(xUsersTeams),
}));

const refineSchema = {
	name: ({ name }) => name.min(3).max(50),
	slug: ({ slug }) =>
		slug
			.min(3)
			.max(25)
			.regex(
				/^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$/,
				'Invalid subdomain' //
			)
			.refine(
				(slug) => {
					return ![
						'development',
						'dev',
						'dns',
						'ftp',
						'host',
						'mail',
						'server',
						'server',
						'smtp',
						'static',
						'assets',
						'test',
						'v',
						'web',
						'www',
						...web,
						...badwords,
						...names,
					].includes(slug);
				},
				'Team slug is not allowed' //
			),
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
