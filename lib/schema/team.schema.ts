import { z } from 'zod';

import { mutateTeamSchema, selectTeamSchema } from '@/lib/db/tables/teams.table';

export const createTeamSchema = z.object({
	name: mutateTeamSchema.shape.name,
	slug: mutateTeamSchema.shape.slug,
	description: mutateTeamSchema.shape.description,
	// members: mutateTeamSchema.shape.members,
});
export type CreateTeamSchema = z.infer<typeof createTeamSchema>;

export const readTeamSchema = selectTeamSchema.pick({
	id: true,
	name: true,
	slug: true,
	description: true,
	ownerId: true,
});
export type ReadTeamSchema = z.infer<typeof readTeamSchema>;
