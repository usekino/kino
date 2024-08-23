import type { SeedUserSchema } from '@/lib/db/tables/users.table';

import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { users } from '@/lib/db/tables/users.table';

export const maxUsersCount = 10;

export const seedUsers = async () => {
	try {
		const generateUsers = (count: number) => {
			const users: SeedUserSchema[] = [
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

		await httpDb.insert(users).values(generateUsers(maxUsersCount));
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with USERS...');
	}
};
