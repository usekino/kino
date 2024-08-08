import { createInsertSchema, createSelectSchema, Refine } from 'drizzle-zod';
import { z } from 'zod';

import { mutateFeedbackCommentsSchema } from '@/lib/db/tables/feedback/feedback-comments.table';
import { feedback } from '@/lib/db/tables/feedback/feedback.table';

const refineSchema = {
	title: ({ title }) => title.min(3).max(120),
	description: ({ description }) => description.max(1500),
	status: () => z.array(z.string()),
	boardId: () => z.string().min(3),
} satisfies Refine<typeof feedback, 'select'>;

const select = createSelectSchema(feedback, refineSchema);
const mutate = createInsertSchema(feedback, refineSchema);
const seed = createInsertSchema(feedback, refineSchema);

export const createFeedbackSchema = mutate
	.pick({
		title: true,
		description: true,
		boardId: true,
		teamId: true,
		projectId: true,
	})
	.and(mutateFeedbackCommentsSchema.pick({ content: true }));

export const selectFeedbackSchema = select.pick({
	id: true,
	title: true,
	description: true,
	status: true,
	teamId: true,
	projectId: true,
	boardId: true,
});

export type SelectFeedbackSchema = z.infer<typeof select>;
export type MutateFeedbackSchema = z.infer<typeof mutate>;
export type SeedFeedbackSchema = z.infer<typeof seed>;
