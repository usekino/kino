import type { BoardsSchema } from '@/lib/schema/boards/boards.schema';
import type { ProjectsSchema } from '@/lib/schema/projects/projects.schema';

import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { boards } from '@/lib/db/tables/boards/boards.table';

const generate = (
	{
		projects,
	}: {
		projects: ProjectsSchema['Seed'][];
	},
	count: number
) => {
	const feedbackBoards: BoardsSchema['Seed'][] = [];

	for (let i = 0; i < count; i++) {
		feedbackBoards.push({
			id: (1 + i).toString(),
			slug: faker.lorem.slug(),
			projectId: faker.number
				.int({
					min: 1,
					max: projects.length,
				})
				.toString(),
			name: faker.lorem.words(1),
			description: faker.lorem.sentence(),
		});
	}
	return feedbackBoards;
};

export const seedBoards = async (...args: Parameters<typeof generate>) => {
	const values = generate(...args);
	try {
		await httpDb.insert(boards).values(values);
		return values;
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with FEEDBACK_BOARDS...');
	}
};
