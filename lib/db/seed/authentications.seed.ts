import type { SeedAuthSchema } from '@/lib/db/tables/authentications.table';

import { Argon2id } from 'oslo/password';

import { httpDb } from '@/lib/db';
import { authentications } from '@/lib/db/tables/authentications.table';

export const maxAuthCount = 10;

export const seedAuthentications = async () => {
	try {
		const generateAuth = async (count: number) => {
			const auth: SeedAuthSchema[] = [
				{
					userId: '1',
					hashedPassword: await new Argon2id().hash('password'),
				},
				{
					userId: '2',
					hashedPassword: await new Argon2id().hash('password'),
				},
			];

			for (let i = 0; i < count; i++) {
				auth.push({
					userId: (3 + i).toString(),
					hashedPassword: await new Argon2id().hash('password'),
				});
			}
			return auth;
		};

		await httpDb.insert(authentications).values(await generateAuth(maxAuthCount));
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with AUTH...');
	}
};
