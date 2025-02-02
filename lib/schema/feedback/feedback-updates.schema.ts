import type { BuildRefine } from 'node_modules/drizzle-zod/schema.types.internal.d.ts';
import type { SchemaObject } from '../_shared';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { feedbackUpdates } from '@/lib/db/tables/feedback/feedback-updates.table';

const refineSchema = {
	type: () => z.enum(['comment', 'edit', 'status']),
	visibility: () => z.enum(['public', 'private']),
} satisfies BuildRefine<typeof feedbackUpdates>;

export const feedbackUpdatesSchema = {
	create: createInsertSchema(feedbackUpdates, refineSchema),
	read: createSelectSchema(feedbackUpdates, refineSchema),
	update: createInsertSchema(feedbackUpdates, refineSchema),
	delete: createInsertSchema(feedbackUpdates, refineSchema).pick({
		id: true,
	}),
	seed: createInsertSchema(feedbackUpdates, refineSchema),
};

export type FeedbackUpdatesSchema = SchemaObject<typeof feedbackUpdatesSchema>;
