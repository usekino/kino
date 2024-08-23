import type { Refine } from 'drizzle-zod';
import type { z } from 'zod';

import badwords from '@heyooo-inc/reserved-subdomains/badwords.json';
import names from '@heyooo-inc/reserved-subdomains/names.json';
import web from '@heyooo-inc/reserved-subdomains/web.json';
import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { defaultColumns } from '../_shared';
import { boards } from '../boards/boards.table';
import { teams } from '../teams/teams.table';
import { projectUsers } from './project-users.table';

export const projects = pgTable('projects', {
	...defaultColumns(),
	name: varchar('name', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	description: varchar('description', { length: 3072 }),
	teamId: varchar('team_id').notNull(),
	websiteUrl: varchar('website_url', { length: 255 }),
});

export const projectRelations = relations(projects, ({ one, many }) => ({
	team: one(teams, {
		fields: [projects.teamId],
		references: [teams.id],
		relationName: 'teams_projects',
	}),
	boards: many(boards, {
		relationName: 'boards_projects',
	}),
	users: many(projectUsers, {
		relationName: 'projectUsers_project',
	}),
}));

const refineSchema = {
	name: ({ name }) =>
		name
			.min(3, 'Name must contain at least 3 characters')
			.max(50, 'Name must contain at most 50 characters'),
	slug: ({ slug }) =>
		slug
			.min(3, 'Slug must contain at least 3 characters')
			.max(25, 'Slug must contain at most 25 characters')
			.regex(
				/^[a-zA-Z0-9_]+$/,
				'Disallowed characters' //
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
				'This slug is not allowed' //
			),
	description: ({ description }) => description.max(300),
	websiteUrl: ({ websiteUrl }) => websiteUrl.url(),
} satisfies Refine<typeof projects, 'select'>;

export const selectProjectSchema = createSelectSchema(projects, refineSchema);
export const mutateProjectSchema = createInsertSchema(projects, refineSchema).omit({
	id: true,
	createdAt: true,
});
export const seedProjectSchema = createInsertSchema(projects, refineSchema);

export type SelectProjectSchema = z.infer<typeof selectProjectSchema>;
export type MutateProjectSchema = z.infer<typeof mutateProjectSchema>;
export type SeedProjectSchema = z.infer<typeof seedProjectSchema>;
