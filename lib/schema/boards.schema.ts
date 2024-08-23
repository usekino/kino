import type { Refine } from 'drizzle-zod';
import type { z } from 'zod';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { boards } from '@/lib/db/tables/boards/boards.table';

const refineSchema = {} satisfies Refine<typeof boards, 'select'>;

export const selectBoardsSchema = createSelectSchema(boards, refineSchema);
export const mutateBoardsSchema = createInsertSchema(boards, refineSchema);
export const seedBoardsSchema = createInsertSchema(boards, refineSchema);

export type SelectBoardsSchema = z.infer<typeof selectBoardsSchema>;
export type MutateBoardsSchema = z.infer<typeof mutateBoardsSchema>;
export type SeedBoardsSchema = z.infer<typeof seedBoardsSchema>;
