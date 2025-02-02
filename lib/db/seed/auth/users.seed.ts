import type { UsersSchema } from '@/lib/schema/users.schema';

import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { users } from '@/lib/db/tables/auth/users.table';
import { slugify } from '@/lib/utils';

const generate = (count: number) => {
	const users: UsersSchema['Seed'][] = [
		{
			id: '1',
			username: 'natedunn',
			email: 'hello@natedunn.net',
			emailVerifiedAt: faker.date.past(),
			bio: 'I made Kino',
			name: 'Nate Dunn',
		},
		{
			id: '2',
			username: 'devinbuster',
			email: 'devinbuster@fake.com',
			emailVerifiedAt: faker.date.past(),
			bio: 'Definitely not the guy you are thinking of.',
			name: 'Devin Buster',
		},
	];

	for (let i = 0; i < count - 2; i++) {
		const name = faker.person.fullName();
		users.push({
			// `3` accounts for the two existing users to increment the id at the
			// correct position
			id: (3 + i).toString(),
			username: slugify(name),
			email: faker.internet.email(),
			emailVerifiedAt: faker.date.past(),
			bio: faker.lorem.sentence(),
			name,
		});
	}
	return users;
};

export const seedUsers = async (count: number) => {
	const values = generate(count);
	try {
		await httpDb.insert(users).values(values);
		return values;
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with USERS...');
	}
};
