import type { BoardsSchema } from '@/lib/schema/boards/boards.schema';
import type { FeedbackSchema } from '@/lib/schema/feedback/feedback.schema';

import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { feedback } from '@/lib/db/tables/feedback/feedback.table';
import { TeamsSchema } from '@/lib/schema/teams/teams.schema';
import { UsersSchema } from '@/lib/schema/users.schema';

export const maxFeedbackCount = 500;

const generate = (
	{
		boards,
		users,
		teams,
	}: {
		boards: BoardsSchema['Seed'][];
		users: UsersSchema['Seed'][];
		teams: TeamsSchema['Seed'][];
	},
	count: number
) => {
	const feedback: FeedbackSchema['Seed'][] = [];

	for (let i = 0; i < count; i++) {
		feedback.push({
			id: (1 + i).toString(),
			teamId: faker.number
				.int({
					min: 1,
					max: teams.length,
				})
				.toString(),
			authorId: faker.number
				.int({
					min: 1,
					max: users.length,
				})
				.toString(),
			assignedUserId: faker.datatype.boolean()
				? faker.number
						.int({
							min: 1,
							max: users.length,
						})
						.toString()
				: null,
			boardId: faker.number
				.int({
					min: 1,
					max: boards.length,
				})
				.toString(),
			title: faker.lorem.sentence(),
			description: faker.lorem.sentence(),
			status: [faker.helpers.arrayElement(['open', 'planned', 'closed'])],
		});
	}

	return feedback;
};
export const seedFeedback = async (...args: Parameters<typeof generate>) => {
	const values = generate(...args);
	try {
		await httpDb.insert(feedback).values(values);
		return values;
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with FEEDBACK...');
	}
};
