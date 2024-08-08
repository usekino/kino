import type { SeedFeedbackSchema } from '@/lib/schema/feedback/feedback.schema';

import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { feedback } from '@/lib/db/tables/feedback/feedback.table';

export const maxFeedbackCount = 100;

export const seedFeedback = async () => {
	const generateFeedback = (count: number) => {
		const feedback: SeedFeedbackSchema[] = [];

		for (let i = 0; i < count; i++) {
			feedback.push({
				userId: faker.number
					.int({
						min: 1,
						max: 10,
					})
					.toString(),
				assignedTo: faker.datatype.boolean()
					? faker.number
							.int({
								min: 1,
								max: 10,
							})
							.toString()
					: null,
				teamId: faker.number
					.int({
						min: 1,
						max: 10,
					})
					.toString(),
				projectId: faker.number
					.int({
						min: 1,
						max: 10,
					})
					.toString(),
				boardId: faker.number
					.int({
						min: 1,
						max: 10,
					})
					.toString(),
				title: faker.lorem.sentence(),
				description: faker.lorem.sentence(),
				status: [faker.helpers.arrayElement(['open', 'planned', 'closed'])],
			});
		}
		return feedback;
	};

	try {
		await httpDb.insert(feedback).values(generateFeedback(maxFeedbackCount));
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with FEEDBACK...');
	}
};
