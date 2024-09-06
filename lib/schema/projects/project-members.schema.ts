import type { Refine } from 'drizzle-zod';
import type { SchemaObject } from '../_shared';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { projectMembers } from '@/lib/db/tables/projects/project-members.table';

import { immutableColumns } from '../_shared';

const refineSchema = {
	userRole: () => z.enum(['member', 'blocked']),
} satisfies Refine<typeof projectMembers, 'select'>;

export const projectMembersSchema = {
	create: createInsertSchema(projectMembers, refineSchema).pick(immutableColumns),
	read: createSelectSchema(projectMembers, refineSchema),
	update: createInsertSchema(projectMembers, refineSchema).pick(immutableColumns),
	delete: createInsertSchema(projectMembers, refineSchema).pick({ id: true }),
	seed: createInsertSchema(projectMembers, refineSchema),
};

export type ProjectMembersSchema = SchemaObject<typeof projectMembersSchema>;
