import type { RoadmapsSchema } from '@/lib/schema/roadmaps/roadmaps.schema';

import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { roadmaps } from '@/lib/db/tables/roadmaps/roadmaps.table';

const generate = (count: number) => {
	const roadmaps: RoadmapsSchema['Seed'][] = [
		{
			id: '1',
			name: 'Roadmap 1',
			slug: 'roadmap-1',
			description: 'This is the first roadmap',
		},
		{
			id: '2',
			name: 'Roadmap 2',
			slug: 'roadmap-2',
			description: 'This is the second roadmap',
		},
	];

	for (let i = 0; i < count - 2; i++) {
		roadmaps.push({
			id: (3 + i).toString(),
			name: faker.company.name(),
			slug: faker.helpers.slugify(faker.company.name()).toLowerCase(),
			description: faker.lorem.sentence(),
		});
	}
	return roadmaps;
};

export const seedRoadmaps = async (...args: Parameters<typeof generate>) => {
	const values = generate(...args);
	try {
		await httpDb.insert(roadmaps).values(values);
		return values;
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with ROADMAPS...');
	}
};
