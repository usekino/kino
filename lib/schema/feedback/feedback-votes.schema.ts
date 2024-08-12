import { createInsertSchema, createSelectSchema, Refine } from 'drizzle-zod';
import { z } from 'zod';

import { feedbackVotes } from '@/lib/db/tables/feedback/feedback-votes.table';

const refineSchema = {
	vote: ({ vote }) => vote.min(-1).max(1),
} satisfies Refine<typeof feedbackVotes, 'select'>;

const select = createSelectSchema(feedbackVotes, refineSchema);
const mutate = createInsertSchema(feedbackVotes, refineSchema);
const seed = createInsertSchema(feedbackVotes, refineSchema);

export const createFeedbackVotesSchema = mutate.pick({
	userId: true,
	feedbackId: true,
	vote: true,
});

export const selectFeedbackVotesSchema = select.pick({
	id: true,
	feedbackId: true,
	userId: true,
	vote: true,
});

export type CreateFeedbackVotesSchema = z.infer<typeof createFeedbackVotesSchema>;
export type SelectFeedbackVotesSchema = z.infer<typeof selectFeedbackVotesSchema>;
export type MutateFeedbackVotesSchema = z.infer<typeof mutate>;
export type SeedFeedbackVotesSchema = z.infer<typeof seed>;
