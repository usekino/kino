import { z } from 'zod';

import { mutateTeamSchema, selectTeamSchema } from '@/lib/db/schema/teams-table';

export const createTeamSchema = z.object({
	name: mutateTeamSchema.shape.name,
	slug: mutateTeamSchema.shape.slug,
	description: mutateTeamSchema.shape.description,
	// members: mutateTeamSchema.shape.members,
	githubUrl: mutateTeamSchema.shape.githubUrl,
});
export type CreateTeamSchema = z.infer<typeof createTeamSchema>;

export const readTeamSchema = selectTeamSchema.pick({
	id: true,
	name: true,
	slug: true,
	description: true,
	ownerId: true,
	githubUrl: true,
	members: true,
});
export type SelectTeamSchema = z.infer<typeof readTeamSchema>;
