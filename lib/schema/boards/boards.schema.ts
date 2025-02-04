import type { BuildRefine } from 'node_modules/drizzle-zod/schema.types.internal.d.ts';
import type { SchemaObject } from '../_shared';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { boards } from '@/lib/db/tables/boards/boards.table';

import { immutableColumns } from '../_shared';

const refineSchema = {} satisfies BuildRefine<typeof boards>;

export const boardsSchema = {
	create: createInsertSchema(boards, refineSchema).pick(immutableColumns),
	read: createSelectSchema(boards, refineSchema),
	update: createInsertSchema(boards, refineSchema).pick(immutableColumns),
	delete: createInsertSchema(boards, refineSchema).pick({ id: true }),
	seed: createInsertSchema(boards, refineSchema),
};

export type BoardsSchema = SchemaObject<typeof boardsSchema>;
