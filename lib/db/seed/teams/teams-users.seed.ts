import type { SeedXUsersTeamsSchema } from '@/lib/schema/teams/teams-users.schema';

import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { maxUsersCount } from '@/lib/db/seed/users.seed';
import { teamUsers } from '@/lib/db/tables/teams/teams-users.table';

const generate = (count: number) => {
	const data: SeedXUsersTeamsSchema[] = [
		{
			userId: '1',
			teamId: '1',
			userRole: ['member', 'admin'],
		},
		{
			userId: '2',
			teamId: '1',
			userRole: ['member'],
		},
	];

	for (let i = 0; i < count; i++) {
		data.push({
			userId: (3 + i).toString(),
			teamId: faker.number
				.int({
					min: 1,
					max: 2,
				})
				.toString(),
			userRole: ['member'],
		});
	}
	return data;
};

export const seedTeamsUsers = async () => {
	try {
		await httpDb.insert(teamUsers).values(generate(maxUsersCount));
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with xUsersTeams...');
	}
};
