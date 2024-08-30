import type { Refine } from 'drizzle-zod';
import type { SchemaObject } from '../_shared';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { feedbackAssignments } from '@/lib/db/tables/feedback/feedback-assignments.table';

const refineSchema = {} satisfies Refine<typeof feedbackAssignments, 'select'>;

export const feedbackAssignmentsSchema = {
	create: createInsertSchema(feedbackAssignments, refineSchema),
	read: createSelectSchema(feedbackAssignments, refineSchema),
	update: createInsertSchema(feedbackAssignments, refineSchema),
	delete: createInsertSchema(feedbackAssignments, refineSchema).pick({
		id: true,
	}),
	seed: createInsertSchema(feedbackAssignments, refineSchema),
};

export type FeedbackAssignmentsSchema = SchemaObject<typeof feedbackAssignmentsSchema>;
