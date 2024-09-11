import type { Refine } from 'drizzle-zod';
import type { SchemaObject } from '../_shared';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { feedback } from '@/lib/db/tables/feedback/feedback.table';

import { immutableColumns, inaccessibleColumns } from '../_shared';

const refineSchema = {
	title: ({ title }) => title.min(3).max(120),
	description: ({ description }) => description.max(1500),
	status: () => z.array(z.string()),
	// boardId: () => z.string().min(3),
} satisfies Refine<typeof feedback, 'select'>;

export const feedbackSchema = {
	create: createInsertSchema(feedback, refineSchema).omit(immutableColumns),
	read: createSelectSchema(feedback, refineSchema).omit(inaccessibleColumns),
	update: createInsertSchema(feedback, refineSchema).omit(immutableColumns),
	delete: createInsertSchema(feedback, refineSchema).pick({ id: true }),
	seed: createInsertSchema(feedback, refineSchema),
};

export type FeedbackSchema = SchemaObject<typeof feedbackSchema>;
