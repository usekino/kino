import type { SeedProjectSchema } from '@/lib/db/tables/projects/projects.table';

import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { projects } from '@/lib/db/tables/projects/projects.table';
import { generateId } from '@/lib/utils';

export const maxProjectsCount = 10;

export const seedProjects = async () => {
	try {
		const generateProjects = (count: number) => {
			const projects: SeedProjectSchema[] = [
				{
					id: '1',
					name: 'Rad',
					slug: 'rad',
					teamId: '1',
				},
				{
					id: '2',
					name: 'Fake Project',
					slug: 'fake_project',
					teamId: '2',
				},
			];

			for (let i = 0; i < count; i++) {
				projects.push({
					id: (3 + i).toString(),
					name: faker.company.name(),
					slug: generateId({
						prefix: 'P',
					}),
					teamId: faker.number
						.int({
							min: 1,
							max: 2,
						})
						.toString(),
				});
			}
			return projects;
		};

		await httpDb.insert(projects).values(generateProjects(maxProjectsCount));
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with PROJECTS...');
	}
};
