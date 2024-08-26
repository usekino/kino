import type { Refine } from 'drizzle-zod';
import type { DBtoCRUD } from '../_shared';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { teamUsers } from '@/lib/db/tables/teams/teams-users.table';

const refineSchema = {
	userRole: () => z.array(z.enum(['member', 'admin', 'blocked'])),
} satisfies Refine<typeof teamUsers, 'select'>;

export const teamUsersSchema = {
	create: createInsertSchema(teamUsers, refineSchema),
	read: createSelectSchema(teamUsers, refineSchema),
	update: createInsertSchema(teamUsers, refineSchema),
	delete: createSelectSchema(teamUsers, refineSchema).pick({
		id: true,
	}),
	seed: createInsertSchema(teamUsers, refineSchema),
};

export type TeamUsersSchema = DBtoCRUD<typeof teamUsersSchema>;

export const selectXUsersTeamsSchema = createSelectSchema(teamUsers, refineSchema);
export const mutateXUsersTeamsSchema = createInsertSchema(teamUsers, refineSchema).omit({
	id: true,
	createdAt: true,
});
export const seedXUsersTeamsSchema = createInsertSchema(teamUsers, refineSchema);

export type SelectXUsersTeamsSchema = z.infer<typeof selectXUsersTeamsSchema>;
export type MutateXUsersTeamsSchema = z.infer<typeof mutateXUsersTeamsSchema>;
export type SeedXUsersTeamsSchema = z.infer<typeof seedXUsersTeamsSchema>;
