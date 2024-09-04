import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { defaultColumns } from '../_shared';
import { feedback } from '../feedback/feedback.table';

export const roadmaps = pgTable('roadmaps', {
	...defaultColumns(),
	name: varchar('name', {
		length: 255,
	}).notNull(),
	slug: varchar('slug', {
		length: 255,
	}).notNull(),
	description: varchar('description', {
		length: 3072,
	}),
});

export const roadmapRelations = relations(roadmaps, ({ many }) => ({
	feedback: many(feedback, {
		relationName: 'roadmaps_feedback',
	}),
}));
