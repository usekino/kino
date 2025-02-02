import type { SchemaObject } from '@/lib/schema/_shared';
import type { BuildRefine } from 'node_modules/drizzle-zod/schema.types.internal.d.ts';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { feedbackComments } from '@/lib/db/tables/feedback/comments/feedback-comments.table';

const refineSchema = {
	status: () => z.array(z.enum(['open', 'planned', 'closed'])),
} satisfies BuildRefine<typeof feedbackComments>;

export const feedbackCommentsSchema = {
	create: createInsertSchema(feedbackComments, refineSchema),
	read: createSelectSchema(feedbackComments, refineSchema),
	update: createInsertSchema(feedbackComments, refineSchema),
	delete: createInsertSchema(feedbackComments, refineSchema).pick({
		id: true,
	}),
	seed: createInsertSchema(feedbackComments, refineSchema),
};

export type FeedbackCommentsSchema = SchemaObject<typeof feedbackCommentsSchema>;
