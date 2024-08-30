import type { Refine } from 'drizzle-zod';
import type { SchemaObject } from '../_shared';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { teamMembers } from '@/lib/db/tables/teams/team-members.table';

const refineSchema = {
	userRole: () => z.array(z.enum(['member', 'admin', 'blocked'])),
} satisfies Refine<typeof teamMembers, 'select'>;

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
