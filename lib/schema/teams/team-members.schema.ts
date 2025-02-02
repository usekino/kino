import type { BuildRefine } from 'node_modules/drizzle-zod/schema.types.internal.d.ts';
import type { SchemaObject } from '../_shared';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { teamMembers } from '@/lib/db/tables/teams/team-members.table';

const refineSchema = {} satisfies BuildRefine<typeof teamMembers>;

export const teamMembersSchema = {
	create: createInsertSchema(teamMembers, refineSchema),
	read: createSelectSchema(teamMembers, refineSchema),
	update: createInsertSchema(teamMembers, refineSchema),
	delete: createSelectSchema(teamMembers, refineSchema).pick({
		id: true,
	}),
	seed: createInsertSchema(teamMembers, refineSchema),
};

export type TeamMembersSchema = SchemaObject<typeof teamMembersSchema>;
