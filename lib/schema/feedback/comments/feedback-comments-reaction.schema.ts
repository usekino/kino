import type { Refine } from 'drizzle-zod';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { feedbackCommentsReactions } from '@/lib/db/tables/feedback/comments/feedback-comments-reactions.table';

import { SchemaObject } from '../../_shared';

const refineSchema = {
	reaction: () => z.enum(['heart', 'wow', 'thumbsUp', 'thumbsDown']),
} satisfies Refine<typeof feedbackCommentsReactions, 'select'>;

export const feedbackCommentsReactionSchema = {
	create: createInsertSchema(feedbackCommentsReactions, refineSchema),
	read: createSelectSchema(feedbackCommentsReactions, refineSchema),
	update: createInsertSchema(feedbackCommentsReactions, refineSchema),
	delete: createInsertSchema(feedbackCommentsReactions, refineSchema).pick({
		id: true,
	}),
	seed: createInsertSchema(feedbackCommentsReactions, refineSchema),
};

export type FeedbackCommentsReactionSchema = SchemaObject<typeof feedbackCommentsReactionSchema>;
