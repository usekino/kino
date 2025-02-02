import type { BuildRefine } from 'node_modules/drizzle-zod/schema.types.internal.d.ts';
import type { SchemaObject } from '../_shared';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { feedback } from '@/lib/db/tables/feedback/feedback.table';

import { immutableColumns, inaccessibleColumns } from '../_shared';

const refineSchema = {
	title: (title) => title.min(3).max(120),
	description: (description) => description.max(1500),
	status: () => z.array(z.string()),
} satisfies BuildRefine<typeof feedback>;

export const feedbackSchema = {
	create: createInsertSchema(feedback, refineSchema).omit(immutableColumns),
	read: createSelectSchema(feedback, refineSchema).omit(inaccessibleColumns),
	update: createInsertSchema(feedback, refineSchema).omit(immutableColumns),
	delete: createInsertSchema(feedback, refineSchema).pick({ id: true }),
	seed: createInsertSchema(feedback, refineSchema),
	_all: createInsertSchema(feedback, refineSchema),
};

export type FeedbackSchema = SchemaObject<typeof feedbackSchema>;
