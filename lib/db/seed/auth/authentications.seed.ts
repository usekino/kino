import type { SeedAuthSchema } from '@/lib/db/tables/auth/authentications.table';

import { Argon2id } from 'oslo/password';

import { httpDb } from '@/lib/db';
import { authentications } from '@/lib/db/tables/auth/authentications.table';
import { UsersSchema } from '@/lib/schema/users.schema';

export const maxAuthCount = 10;

const generate = async ({ users }: { users: UsersSchema['Seed'][] }) => {
	const auth: SeedAuthSchema[] = [];

	for (let i = 0; i < users.length; i++) {
		if (!process.env.SEED_USER_PASSWORD) {
			throw new Error('SEED_USER_PASSWORD is not set');
		}

		auth.push({
			userId: users[i].id,
			hashedPassword: await new Argon2id().hash(process.env.SEED_USER_PASSWORD),
		});
	}
	return auth;
};

export const seedAuthentications = async (...args: Parameters<typeof generate>) => {
	const values = await generate(...args);
	try {
		await httpDb.insert(authentications).values(values);
		return values;
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with AUTH...');
	}
};
