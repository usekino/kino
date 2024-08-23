import badwords from '@heyooo-inc/reserved-subdomains/badwords.json';
import names from '@heyooo-inc/reserved-subdomains/names.json';
import web from '@heyooo-inc/reserved-subdomains/web.json';
import { createInsertSchema, createSelectSchema, Refine } from 'drizzle-zod';
import { z } from 'zod';

import { teams } from '../db/tables/teams/teams.table';

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

const select = createSelectSchema(teams, refineSchema);
const mutate = createInsertSchema(teams, refineSchema).omit({
	id: true,
	createdAt: true,
});
const seed = createInsertSchema(teams, refineSchema);

export type MutateTeamSchema = z.infer<typeof mutate>;
export type SeedTeamSchema = z.infer<typeof seed>;

export const createTeamSchema = z.object({
	name: mutate.shape.name,
	slug: mutate.shape.slug,
	description: mutate.shape.description,
	// members: mutateTeamSchema.shape.members,
});
export type CreateTeamSchema = z.infer<typeof createTeamSchema>;

export const selectTeamSchema = select.pick({
	id: true,
	name: true,
	slug: true,
	description: true,
	ownerId: true,
});
export type SelectTeamSchema = z.infer<typeof selectTeamSchema>;
