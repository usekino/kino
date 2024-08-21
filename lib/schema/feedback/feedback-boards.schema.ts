import type { Refine } from 'drizzle-zod';
import type { z } from 'zod';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { feedbackBoards } from '@/lib/db/tables/feedback/feedback-boards.table';

const refineSchema = {} satisfies Refine<typeof feedbackBoards, 'select'>;

export const selectFeedbackBoardsSchema = createSelectSchema(feedbackBoards, refineSchema);
export const mutateFeedbackBoardsSchema = createInsertSchema(feedbackBoards, refineSchema);
export const seedFeedbackBoardsSchema = createInsertSchema(feedbackBoards, refineSchema);

export type SelectFeedbackBoardsSchema = z.infer<typeof selectFeedbackBoardsSchema>;
export type MutateFeedbackBoardsSchema = z.infer<typeof mutateFeedbackBoardsSchema>;
export type SeedFeedbackBoardsSchema = z.infer<typeof seedFeedbackBoardsSchema>;
