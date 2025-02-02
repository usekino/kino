import type { TeamsSchema } from '@/lib/schema/teams/teams.schema';
import type { UsersSchema } from '@/lib/schema/users.schema';

import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { teams } from '@/lib/db/tables/teams/teams.table';

const generate = (
	{
		users,
	}: {
		users: UsersSchema['Seed'][];
	},
	count: number
) => {
	const teams: TeamsSchema['Seed'][] = [
		{
			id: '1',
			ownerId: '1',
			name: 'Nate Dunn',
			slug: 'natedunn',
			description: 'This is Nate&apos;s personal team',
		},
		{
			id: '2',
			ownerId: '2',
			name: 'ACME Inc.',
			slug: 'acme',
			description: 'Fake Kino is a project to test other project',
		},
	];

	for (let i = 0; i < count - 2; i++) {
		teams.push({
			id: (3 + i).toString(),
			ownerId: users[i].id,
			name: faker.company.name(),
			slug: faker.helpers.slugify(faker.company.name()).toLowerCase(),
			// description: faker.lorem.sentence(),
		});
	}
	return teams;
};

export const seedTeams = async (...args: Parameters<typeof generate>) => {
	const values = generate(...args);
	try {
		await httpDb.insert(teams).values(values);
		return values;
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with TEAMS...');
	}
};
