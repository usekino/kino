import type { SeedFeedbackSchema } from '@/lib/schema/feedback/feedback.schema';

import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { feedback } from '@/lib/db/tables/feedback/feedback.table';

import { maxProjectsCount } from '../projects.seed';
import { maxTeamsCount } from '../teams/teams.seed';
import { maxUsersCount } from '../users.seed';

export const maxFeedbackCount = 500;

export const seedFeedback = async () => {
	const generateFeedback = (count: number) => {
		const feedback: SeedFeedbackSchema[] = [];

		for (let i = 0; i < count; i++) {
			feedback.push({
				id: (1 + i).toString(),
				teamId: faker.number
					.int({
						min: 1,
						max: maxTeamsCount,
					})
					.toString(),
				creatorUserId: faker.number
					.int({
						min: 1,
						max: maxUsersCount,
					})
					.toString(),
				assignedUserId: faker.datatype.boolean()
					? faker.number
							.int({
								min: 1,
								max: maxUsersCount,
							})
							.toString()
					: null,
				boardId: faker.number
					.int({
						min: 1,
						max: maxProjectsCount,
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
