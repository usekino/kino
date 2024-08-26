import { z } from 'zod';

import { selectProjectSchema } from '../db/tables';
import { selectTeamSchema } from './teams/teams.schema';
import { usersSchema } from './users.schema';

export const teamSelectSchema = z.object({
	userId: usersSchema.read.shape.id,
	team: z.object({
		slug: selectTeamSchema.shape.slug,
		id: selectTeamSchema.shape.id,
	}),
});
export type TeamSelect = z.infer<typeof teamSelectSchema>;

export const teamProjectSelectSchema = z.object({
	userId: usersSchema.read.shape.id,
	id: selectProjectSchema.shape.id,
	slug: selectProjectSchema.shape.slug,
});
export type TeamProjectSelect = z.infer<typeof teamProjectSelectSchema>;
