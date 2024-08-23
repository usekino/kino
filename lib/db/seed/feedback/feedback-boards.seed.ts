import type { SeedBoardsSchema } from '@/lib/schema/boards.schema';

import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { boards } from '@/lib/db/tables/boards/boards.table';

import { maxProjectsCount } from '../projects.seed';

export const maxFeedbackBoardsCount = 800;

export const seedFeedbackBoards = async () => {
	const generateFeedbackBoards = (count: number) => {
		const feedbackBoards: SeedBoardsSchema[] = [];

		for (let i = 0; i < count; i++) {
			feedbackBoards.push({
				id: (1 + i).toString(),
				slug: faker.lorem.slug(),
				projectId: faker.number
					.int({
						min: 1,
						max: maxProjectsCount,
					})
					.toString(),
				name: faker.lorem.words(1),
				description: faker.lorem.sentence(),
			});
		}
		return feedbackBoards;
	};

	try {
		await httpDb.insert(boards).values(generateFeedbackBoards(maxFeedbackBoardsCount));
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with FEEDBACK_BOARDS...');
	}
};
