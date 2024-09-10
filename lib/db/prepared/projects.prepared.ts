import type { User } from 'lucia';

import { and, eq, not, or, sql } from 'drizzle-orm';
import { z } from 'zod';

import { projectsSchema } from '@/lib/schema/projects/projects.schema';
import { teamsSchema } from '@/lib/schema/teams/teams.schema';
import { createTruthy } from '@/lib/utils';
import { MappedByProject } from '@/lib/utils/project.utils';

import { db } from '..';

// teamMembers -> access to backend, team invite only
// projectMembers -> access to frontend, providing feedback, users of the project

const P_GetUserProjects = db.query.users
	.findFirst({
		columns: {},
		where: (table) => {
			return eq(table.id, sql.placeholder('userId'));
		},
		with: {
			projectMember: {
				columns: {},
				where: (table) => {
					return and(
						eq(table.userId, sql.placeholder('userId')),
						or(
							eq(table.userRole, 'admin'),
							eq(table.userRole, 'member') //
						),
						not(eq(table.userRole, 'blocked')) //
					);
				},
				with: {
					project: {
						columns: createTruthy(projectsSchema.read.shape),
						with: {
							team: {
								columns: {
									id: true,
									name: true,
									slug: true,
								},
							},
						},
					},
				},
			},
			teamMember: {
				columns: {},
				where: (table) => {
					return and(
						eq(table.userId, sql.placeholder('userId')),
						or(
							sql`${table.userRole} @> ${'"owner"'}`,
							sql`${table.userRole} @> ${'"member"'}` //
						),
						not(sql`${table.userRole} @> ${'"blocked"'}`)
					);
				},
				with: {
					team: {
						with: {
							projects: {
								columns: createTruthy(projectsSchema.read.shape),
								with: {
									team: {
										columns: {
											id: true,
											name: true,
											slug: true,
										},
									},
								},
							},
						},
					},
				},
			},
		},
	})
	.prepare('P_GetUserProjects');

export const getUserProjects = async ({ user }: { user: User }) => {
	const data = await P_GetUserProjects.execute({ userId: user.id });

	if (!data) return null;

	const flatProjects = new Map([
		// ...data.projectMember.map(({ project }): [string, MappedByProject] => [project.id, project]),
		...data.teamMember.flatMap(({ team }) =>
			team.projects.map((project): [string, MappedByProject] => [project.id, project])
		),
	]);

	return projectsSchema.read
		.merge(
			z.object({
				team: teamsSchema.read.pick({
					id: true,
					name: true,
					slug: true,
				}),
			})
		)
		.array()
		.parse(Array.from(flatProjects.values()));
};
