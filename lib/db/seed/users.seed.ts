import type { UsersSchema } from '@/lib/schema/users.schema';

import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { users } from '@/lib/db/tables/users.table';

export const maxUsersCount = 10;

const generate = (count: number) => {
	const users: UsersSchema['Seed'][] = [
		{
			id: '1',
			username: 'natedunn',
			email: 'hello@natedunn.net',
			emailVerifiedAt: faker.date.past(),
		},
		{
			id: '2',
			username: 'davinbuster',
			email: 'davinbuster@fake.com',
			emailVerifiedAt: faker.date.past(),
		},
	];

	for (let i = 0; i < count; i++) {
		users.push({
			// `3` accounts for the two existing users to increment the id at the
			// correct position
			id: (3 + i).toString(),
			username: faker.internet.userName(),
			email: faker.internet.email(),
			emailVerifiedAt: faker.date.past(),
		});
	}
	return users;
};

export const seedUsers = async () => {
	try {
		await httpDb.insert(users).values(generate(maxUsersCount));
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with USERS...');
	}
};
