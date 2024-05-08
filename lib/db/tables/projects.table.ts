import type { Refine } from 'drizzle-zod';
import type { z } from 'zod';

import badwords from '@heyooo-inc/reserved-subdomains/badwords.json';
import names from '@heyooo-inc/reserved-subdomains/names.json';
import web from '@heyooo-inc/reserved-subdomains/web.json';
import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { defaultColumns } from './_shared';
import { teams } from './teams.table';

export const projects = pgTable('projects', {
	// Defaults
	...defaultColumns(),
	//
	name: varchar('name', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	description: varchar('description', { length: 3072 }),
	teamId: varchar('team_id').notNull(),
	githubUrl: varchar('github_url', { length: 255 }),
});

export const projectRelations = relations(projects, ({ one }) => ({
	team: one(teams, {
		fields: [projects.teamId],
		references: [teams.id],
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
	githubUrl: ({ githubUrl }) => githubUrl.url(),
} satisfies Refine<typeof projects, 'select'>;

export const selectProjectSchema = createSelectSchema(projects, refineSchema);
export const mutateProjectSchema = createInsertSchema(projects, refineSchema).omit({
	id: true,
	createdAt: true,
});

export type SelectProjectSchema = z.infer<typeof selectProjectSchema>;
export type MutateProjectSchema = z.infer<typeof mutateProjectSchema>;
