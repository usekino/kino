import type { Refine } from 'drizzle-zod';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { feedbackComments } from '@/lib/db/tables/feedback/comments/feedback-comments.table';

const refineSchema = {
	content: ({ content }) => content.max(1500),
	status: () => z.array(z.enum(['open', 'planned', 'closed'])),
} satisfies Refine<typeof feedbackComments, 'select'>;

export const selectFeedbackCommentsSchema = createSelectSchema(feedbackComments, refineSchema);
export const mutateFeedbackCommentsSchema = createInsertSchema(feedbackComments, refineSchema);
export const seedFeedbackCommentsSchema = createInsertSchema(feedbackComments, refineSchema);

export type SelectFeedbackCommentsSchema = z.infer<typeof selectFeedbackCommentsSchema>;
export type MutateFeedbackCommentsSchema = z.infer<typeof mutateFeedbackCommentsSchema>;
export type SeedFeedbackCommentsSchema = z.infer<typeof seedFeedbackCommentsSchema>;
