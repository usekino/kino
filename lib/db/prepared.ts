import { cache } from 'react';
import { arrayContains, sql } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '.';
import { projectsSchema } from '../schema/projects/projects.schema';
import { teamsSchema } from '../schema/teams/teams.schema';
import { createTruthy } from '../utils';

const P_GetTeamData = db.query.teams
	.findFirst({
		columns: createTruthy(teamsSchema.read.shape),
		where: (team, { eq }) => eq(team.slug, sql.placeholder('slug')),
		with: {
			projects: {
				columns: createTruthy(projectsSchema.read.shape),
			},
		},
	})
	.prepare('P_GetTeamData');

export const getTeamData = cache(async (slug: string) => {
	const team = await P_GetTeamData.execute({ slug });
	return team
		? teamsSchema.read.merge(z.object({ projects: z.array(projectsSchema.read) })).parseAsync(team)
		: null;
});

const P_GetProjectData = db.query.projects
	.findFirst({
		columns: createTruthy(projectsSchema.read.shape),
		where: (project, { eq }) => eq(project.slug, sql.placeholder('slug')),
		with: {
			team: {
				columns: createTruthy(teamsSchema.read.shape),
			},
		},
	})
	.prepare('P_GetProjectData');

export const getProjectData = cache(async (slug: string) => {
	const project = await P_GetProjectData.execute({ slug });

	const validatedProject = project
		? projectsSchema.read
				.merge(
					z.object({
						team: teamsSchema.read,
					})
				)
				.parse(project)
		: null;

	return validatedProject;
});

export const P_GetUserProjectsByUserId = db.query.teamMembers
	.findMany({
		columns: {},
		where: (table, { eq, and, or, not }) => {
			return and(
				eq(table.userId, sql.placeholder('userId')),
				or(
					arrayContains(table.userRole, ['admin']),
					arrayContains(table.userRole, ['member']) //
				),
				not(arrayContains(table.userRole, ['blocked']))
			);
		},
		with: {
			team: {
				columns: createTruthy(teamsSchema.read.shape),
				with: {
					projects: {
						columns: createTruthy(projectsSchema.read.shape),
					},
				},
			},
		},
	})
	.prepare('P_ProjectsByTeam');

export const getUserProjectsByUserId = cache(async (userId: string) => {
	const userProjects = await P_GetUserProjectsByUserId.execute({ userId });
	return userProjects;
});
