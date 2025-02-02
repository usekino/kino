import type { ProjectMembersSchema } from '@/lib/schema/projects/project-members.schema';
import type { ProjectsSchema } from '@/lib/schema/projects/projects.schema';
import type { UsersSchema } from '@/lib/schema/users.schema';

import { faker } from '@faker-js/faker';

import { httpDb } from '@/lib/db';
import { projectMembers } from '@/lib/db/tables/projects/project-members.table';

const generate = ({
	projects,
	users,
}: {
	projects: ProjectsSchema['Seed'][];
	users: UsersSchema['Seed'][];
}) => {
	const projectMembers: ProjectMembersSchema['Seed'][] = [];

	for (let i = 0; i < users.length; i++) {
		projectMembers.push({
			userId: faker.number
				.int({
					min: 1,
					max: users.length,
				})
				.toString(),
			projectId: faker.number
				.int({
					min: 1,
					max: projects.length,
				})
				.toString(),
			userRole: faker.helpers.arrayElement(['member']),
		});
	}
	return projectMembers;
};

export const seedProjectMembers = async (...args: Parameters<typeof generate>) => {
	const values = generate(...args);
	try {
		await httpDb.insert(projectMembers).values(values);
		return values;
	} catch (error) {
		console.error(error);
		throw new Error('Seed error with PROJECT_MEMBERS...');
	}
};
