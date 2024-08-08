import { z } from 'zod';

import { mutateProjectSchema, selectProjectSchema } from '../db/tables/projects.table';
import { selectTeamSchema } from './team.schema';

export const createProjectSchema = mutateProjectSchema.pick({
	name: true,
	slug: true,
	description: true,
	teamId: true,
	githubUrl: true,
});
export type CreateProjectSchema = z.infer<typeof createProjectSchema>;

export const readProjectSchema = selectProjectSchema.pick({
	id: true,
	name: true,
	slug: true,
	description: true,
	teamId: true,
	githubUrl: true,
});
export type ReadProjectSchema = z.infer<typeof readProjectSchema>;

export const projectsByTeamSchema = z
	.object({
		teamId: selectTeamSchema.shape.id,
	})
	.optional();
