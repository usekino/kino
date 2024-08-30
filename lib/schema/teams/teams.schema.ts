import badwords from '@heyooo-inc/reserved-subdomains/badwords.json';
import names from '@heyooo-inc/reserved-subdomains/names.json';
import web from '@heyooo-inc/reserved-subdomains/web.json';
import { createInsertSchema, createSelectSchema, Refine } from 'drizzle-zod';

import { teams } from '@/lib/db/tables/teams/teams.table';

import { SchemaObject } from '../_shared';

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
} satisfies Refine<typeof teams, 'select'>;

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
