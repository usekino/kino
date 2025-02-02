import type { BuildRefine } from 'node_modules/drizzle-zod/schema.types.internal.d.ts';
import type { SchemaObject } from '../_shared';

import badwords from '@heyooo-inc/reserved-subdomains/badwords.json';
import names from '@heyooo-inc/reserved-subdomains/names.json';
import web from '@heyooo-inc/reserved-subdomains/web.json';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { immutableColumns, inaccessibleColumns } from '../_shared';
import { projects } from '../../db/tables/projects/projects.table';

const refineSchema = {
	name: (name) =>
		name
			.min(3, 'Name must contain at least 3 characters')
			.max(50, 'Name must contain at most 50 characters'),
	slug: (slug) =>
		slug
			.min(3, 'Slug must contain at least 3 characters')
			.max(25, 'Slug must contain at most 25 characters')
			.regex(
				/^(?!-)(?!.*--)([A-Za-z0-9_]+-?[A-Za-z0-9_]+)*(_|-)?(?<!-)$/,
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
	description: (description) => description.max(300).optional(),
	websiteUrl: (websiteUrl) => websiteUrl.url().optional(),
} satisfies BuildRefine<typeof projects>;

export const projectsSchema = {
	create: createInsertSchema(projects, refineSchema).omit(immutableColumns),
	read: createSelectSchema(projects, refineSchema).omit(inaccessibleColumns),
	update: createInsertSchema(projects, refineSchema).omit(immutableColumns).pick({
		id: true,
		name: true,
		slug: true,
		description: true,
		teamId: true,
		websiteUrl: true,
	}),
	delete: createInsertSchema(projects, refineSchema).pick({ id: true }),
	seed: createInsertSchema(projects, refineSchema),
};

export type ProjectsSchema = SchemaObject<typeof projectsSchema>;
