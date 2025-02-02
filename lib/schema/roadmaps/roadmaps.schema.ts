import type { BuildRefine } from 'node_modules/drizzle-zod/schema.types.internal.d.ts';
import type { SchemaObject } from '../_shared';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { roadmaps } from '@/lib/db/tables/roadmaps/roadmaps.table';

import { immutableColumns, inaccessibleColumns } from '../_shared';

const refineSchema = {} satisfies BuildRefine<typeof roadmaps>;

export const roadmapsSchema = {
	create: createInsertSchema(roadmaps, refineSchema).omit(immutableColumns),
	read: createSelectSchema(roadmaps, refineSchema).omit(inaccessibleColumns),
	update: createInsertSchema(roadmaps, refineSchema).omit(immutableColumns),
	delete: createInsertSchema(roadmaps, refineSchema).pick({ id: true }),
	seed: createInsertSchema(roadmaps, refineSchema),
};

export type RoadmapsSchema = SchemaObject<typeof roadmapsSchema>;
