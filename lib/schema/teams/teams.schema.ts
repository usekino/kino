import type { BuildRefine } from 'node_modules/drizzle-zod/schema.types.internal.d.ts';
import type { SchemaObject } from '../_shared';

import badwords from '@heyooo-inc/reserved-subdomains/badwords.json';
import names from '@heyooo-inc/reserved-subdomains/names.json';
import web from '@heyooo-inc/reserved-subdomains/web.json';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { teams } from '@/lib/db/tables/teams/teams.table';

const refineSchema = {
	name: (name) => name.min(3).max(50),
	slug: (slug) =>
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
	description: (description) => description.max(300).optional(),
} satisfies BuildRefine<typeof teams>;

export const teamsSchema = {
	create: createInsertSchema(teams, refineSchema).omit({
		id: true,
		createdAt: true,
	}),
	read: createSelectSchema(teams, refineSchema),
	update: createInsertSchema(teams, refineSchema).omit({
		id: true,
		createdAt: true,
	}),
	delete: createInsertSchema(teams, refineSchema).omit({
		id: true,
		createdAt: true,
	}),
	seed: createInsertSchema(teams, refineSchema),
};

export type TeamsSchema = SchemaObject<typeof teamsSchema>;
