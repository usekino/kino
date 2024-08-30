import type { SchemaObject } from './_shared';

import { z } from 'zod';

import { projectsSchema } from '../schema/projects/projects.schema';
import { teamsSchema } from './teams/teams.schema';
import { usersSchema } from './users.schema';

export const dashBoardSchema = {
	teamProjectSelect: z.object({
		userId: usersSchema.read.shape.id,
		id: projectsSchema.read.shape.id,
		slug: projectsSchema.read.shape.slug,
	}),
	teamSelect: z.object({
		userId: usersSchema.read.shape.id,
		team: z.object({
			slug: teamsSchema.read.shape.slug,
			id: teamsSchema.read.shape.id,
		}),
	}),
};

export type DashboardSchema = SchemaObject<typeof dashBoardSchema>;
