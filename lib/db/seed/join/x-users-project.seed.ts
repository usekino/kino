import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { maxUsersCount } from '@/lib/db/seed/users.seed';
import {
	SeedXUsersProjectsSchema,
	xUsersProjects,
} from '@/lib/db/tables/join/x-users-projects.table';

export const seedXUsersProjects = async () => {
	try {
		const generateXUsersProjects = (count: number) => {
			const xUsersProjects: SeedXUsersProjectsSchema[] = [
				{
					userId: '1',
					projectId: '1',
				},
				{
					userId: '2',
					projectId: '1',
				},
			];
			for (let i = 0; i < count; i++) {
				xUsersProjects.push({
					userId: (3 + i).toString(),
					projectId: faker.number
						.int({
							min: 1,
							max: 2,
						})
						.toString(),
				});
			}
			return xUsersProjects;
		};

		await httpDb.insert(xUsersProjects).values(generateXUsersProjects(maxUsersCount));
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with xUsersProjects...');
	}
};
