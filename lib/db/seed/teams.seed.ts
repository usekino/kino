import type { SeedTeamSchema } from '@/lib/schema/team.schema';

import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { teams } from '@/lib/db/tables/teams/teams.table';

export const maxTeamsCount = 10;

export const seedTeams = async () => {
	try {
		const generateTeams = (count: number) => {
			const teams: SeedTeamSchema[] = [
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
					name: 'Fake Kino',
					slug: 'kino',
					description: 'Fake Kino is a project to test other project',
				},
			];

			for (let i = 0; i < count; i++) {
				teams.push({
					ownerId: '1',
					name: faker.company.name(),
					slug: faker.helpers.slugify(faker.company.name()),
					description: faker.lorem.sentence(),
				});
			}
			return teams;
		};

		await httpDb.insert(teams).values(generateTeams(maxTeamsCount));
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with TEAMS...');
	}
};
