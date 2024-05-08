import type { Refine } from 'drizzle-zod';
import type { z } from 'zod';

import badwords from '@heyooo-inc/reserved-subdomains/badwords.json';
import names from '@heyooo-inc/reserved-subdomains/names.json';
import web from '@heyooo-inc/reserved-subdomains/web.json';
import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { defaultColumns } from './_shared';
import { xUsersTeams } from './join/x-users-teams.table';
import { users } from './lucia/users.table';
import { projects } from './projects.table';

export const teams = pgTable('teams', {
	// Defaults
	...defaultColumns(),
	//
	name: varchar('name', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	description: varchar('description', { length: 3072 }),
	ownerId: varchar('owner_id', {
		length: 255,
	}).notNull(),
});

export const teamRelations = relations(teams, ({ one, many }) => ({
	owner: one(users, {
		fields: [teams.ownerId],
		references: [users.id],
		relationName: 'owner',
	}),
	members: many(xUsersTeams, {
		relationName: 'members',
	}),
	projects: many(projects, {
		relationName: 'team_projects',
	}),
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
	// members: () => z.array(z.string()).min(1).max(3),
} satisfies Refine<typeof teams, 'select'>;

export const selectTeamSchema = createSelectSchema(teams, refineSchema);
export const mutateTeamSchema = createInsertSchema(teams, refineSchema).omit({
	id: true,
	createdAt: true,
});

export type SelectTeamSchema = z.infer<typeof selectTeamSchema>;
export type MutateTeamSchema = z.infer<typeof mutateTeamSchema>;
