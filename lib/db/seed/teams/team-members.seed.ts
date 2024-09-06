import type { TeamMembersSchema } from '@/lib/schema/teams/team-members.schema';
import type { TeamsSchema } from '@/lib/schema/teams/teams.schema';
import type { UsersSchema } from '@/lib/schema/users.schema';

import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { teamMembers } from '@/lib/db/tables/teams/team-members.table';

const generate = ({
	teams,
	users,
}: {
	teams: TeamsSchema['Seed'][];
	users: UsersSchema['Seed'][];
}) => {
	const data: TeamMembersSchema['Seed'][] = [
		{
			userId: '1',
			teamId: '1',
			userRole: ['owner', 'member'],
		},
		{
			userId: '2',
			teamId: '1',
			userRole: ['owner', 'member'],
		},
	];

	for (let i = 0; i < users.length - 2; i++) {
		data.push({
			userId: users[i].id,
			teamId: faker.number
				.int({
					min: 1,
					max: teams.length,
				})
				.toString(),
			// userRole: 'member',
		});
	}
	return data;
};

export const seedTeamMembers = async (...args: Parameters<typeof generate>) => {
	const values = generate(...args);
	try {
		await httpDb.insert(teamMembers).values(values);
		return values;
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with xUsersTeams...');
	}
};
