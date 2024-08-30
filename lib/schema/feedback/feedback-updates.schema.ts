import type { Refine } from 'drizzle-zod';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { feedbackUpdates } from '@/lib/db/tables/feedback/feedback-updates.table';

import { SchemaObject } from '../_shared';

const refineSchema = {
	type: () => z.enum(['comment', 'edit', 'status']),
	visibility: () => z.enum(['public', 'private']),
} satisfies Refine<typeof feedbackUpdates, 'select'>;

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
