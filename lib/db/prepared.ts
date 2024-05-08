import { cache } from 'react';
import { sql } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '.';
import { readProjectSchema } from '../schema/project.schema';
import { readTeamSchema } from '../schema/team.schema';
import { createTruthyObject } from '../utils';

const P_GetTeamData = db.query.teams
	.findFirst({
		columns: createTruthyObject(readTeamSchema.shape),
		where: (team, { eq }) => eq(team.slug, sql.placeholder('slug')),
	})
	.prepare('P_GetTeamData');

export const getTeamData = cache(async (slug: string) => {
	const team = await P_GetTeamData.execute({ slug });
	return team ? readTeamSchema.parseAsync(team) : null;
});

const P_GetProjectData = db.query.projects
	.findFirst({
		columns: createTruthyObject(readProjectSchema.shape),
		where: (project, { eq }) => eq(project.slug, sql.placeholder('slug')),
		with: {
			team: {
				columns: createTruthyObject(readTeamSchema.shape),
			},
		},
	})
	.prepare('P_GetProjectData');

export const getProjectData = cache(async (slug: string) => {
	const project = await P_GetProjectData.execute({ slug });

	const validatedProject = project
		? readProjectSchema
				.merge(
					z.object({
						team: readTeamSchema,
					})
				)
				.parse(project)
		: null;

	return validatedProject;
});
