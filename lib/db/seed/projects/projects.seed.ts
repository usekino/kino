import type { ProjectsSchema } from '@/lib/schema/projects/projects.schema';
import type { TeamsSchema } from '@/lib/schema/teams/teams.schema';

import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { projects } from '@/lib/db/tables/projects/projects.table';
import { generateId } from '@/lib/utils';

const generate = (teams: TeamsSchema['Seed'][], count: number) => {
	const projects: ProjectsSchema['Seed'][] = [
		{
			id: '1',
			name: 'Rad',
			slug: 'rad',
			teamId: teams[0]?.id ?? '1',
		},
		{
			id: '2',
			name: 'Kino',
			slug: 'kino',
			teamId: teams[0]?.id ?? '1',
		},
		{
			id: '3',
			name: 'Big Project',
			slug: 'big-project',
			teamId: teams[1]?.id ?? '2',
		},
	];

	for (let i = 0; i < count - 3; i++) {
		projects.push({
			id: (4 + i).toString(),
			name: faker.company.name(),
			slug: generateId({
				prefix: 'P',
			}),
			teamId: faker.number
				.int({
					min: 1,
					max: teams.length,
				})
				.toString(),
		});
	}
	return projects;
};

export const seedProjects = async (...args: Parameters<typeof generate>) => {
	const values = generate(...args);
	try {
		await httpDb.insert(projects).values(values);
		return values;
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with PROJECTS...');
	}
};
