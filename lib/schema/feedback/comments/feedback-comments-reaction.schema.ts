import type { BuildRefine } from 'node_modules/drizzle-zod/schema.types.internal.d.ts';
import type { SchemaObject } from '../../_shared';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { feedbackCommentsReactions } from '@/lib/db/tables/feedback/comments/feedback-comments-reactions.table';

const refineSchema = {
	reaction: () => z.enum(['heart', 'wow', 'thumbsUp', 'thumbsDown']),
} satisfies BuildRefine<typeof feedbackCommentsReactions>;

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
