import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { maxUsersCount } from '@/lib/db/seed/users.seed';
import { SeedXUsersTeamsSchema, teamUsers } from '@/lib/db/tables/teams/teams-users.table';

export const seedXUsersTeams = async () => {
	try {
		const generateXUsersTeams = (count: number) => {
			const xUsersTeams: SeedXUsersTeamsSchema[] = [
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
				xUsersTeams.push({
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
			return xUsersTeams;
		};

		await httpDb.insert(teamUsers).values(generateXUsersTeams(maxUsersCount));
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with xUsersTeams...');
	}
};
