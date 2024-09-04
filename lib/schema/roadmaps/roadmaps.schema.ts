import type { Refine } from 'drizzle-zod';
import type { SchemaObject } from '../_shared';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { roadmaps } from '@/lib/db/tables/roadmaps/roadmaps.table';

import { immutableColumns, inaccessibleColumns } from '../_shared';

const refineSchema = {} satisfies Refine<typeof roadmaps, 'select'>;

export const roadmapsSchema = {
	create: createInsertSchema(roadmaps, refineSchema).omit(immutableColumns),
	read: createSelectSchema(roadmaps, refineSchema).omit(inaccessibleColumns),
	update: createInsertSchema(roadmaps, refineSchema).omit(immutableColumns),
	delete: createInsertSchema(roadmaps, refineSchema).pick({ id: true }),
	seed: createInsertSchema(roadmaps, refineSchema),
};

export type RoadmapsSchema = SchemaObject<typeof roadmapsSchema>;
