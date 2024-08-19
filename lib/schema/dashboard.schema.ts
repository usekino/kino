import { z } from 'zod';

import { selectProjectSchema, selectUserSchema } from '../db/tables';
import { selectTeamSchema } from './team.schema';

export const teamSelectSchema = z.object({
	userId: selectUserSchema.shape.id,
	team: z.object({
		slug: selectTeamSchema.shape.slug,
		id: selectTeamSchema.shape.id,
	}),
});
export type TeamSelect = z.infer<typeof teamSelectSchema>;

export const teamProjectSelectSchema = z.object({
	userId: selectUserSchema.shape.id,
	id: selectProjectSchema.shape.id,
	slug: selectProjectSchema.shape.slug,
});
export type TeamProjectSelect = z.infer<typeof teamProjectSelectSchema>;
