import type { Refine } from 'drizzle-zod';
import type { SchemaObject } from '../_shared';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { feedbackVotes } from '@/lib/db/tables/feedback/feedback-votes.table';

import { immutableColumns } from '../_shared';

const refineSchema = {
	vote: ({ vote }) => vote.min(1).max(1),
} satisfies Refine<typeof feedbackVotes, 'select'>;

export const feedbackVotesSchema = {
	create: createInsertSchema(feedbackVotes, refineSchema).omit(immutableColumns),
	read: createSelectSchema(feedbackVotes, refineSchema),
	update: createInsertSchema(feedbackVotes, refineSchema).omit(immutableColumns),
	delete: createInsertSchema(feedbackVotes, refineSchema).pick({ id: true }),
	seed: createInsertSchema(feedbackVotes, refineSchema),
};

export type FeedbackVotesSchema = SchemaObject<typeof feedbackVotesSchema>;
