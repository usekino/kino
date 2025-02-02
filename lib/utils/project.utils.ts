import type { ProjectsSchema } from '@/lib/schema/projects/projects.schema';
import type { TeamsSchema } from '@/lib/schema/teams/teams.schema';
import type { API } from '../trpc/routers/_app';

export type MappedByProject = ProjectsSchema['Read'] & {
	team: {
		id: TeamsSchema['Read']['id'];
		slug: TeamsSchema['Read']['slug'];
		name: TeamsSchema['Read']['name'];
	};
};

export type MappedByTeam = {
	id: TeamsSchema['Read']['id'];
	slug: TeamsSchema['Read']['slug'];
	name: TeamsSchema['Read']['name'];
	projects: ProjectsSchema['Read'][];
};

export const groupProjectsByTeam = (
	projects: API['output']['project']['getUserProjects']
): MappedByTeam[] | null => {
	const teamMap = new Map<string, MappedByTeam>();

	if (!projects) return null;

	projects.forEach((project) => {
		const { team, ...projectData } = project;

		if (!teamMap.has(team.id)) {
			teamMap.set(team.id, {
				id: team.id,
				slug: team.slug,
				name: team.name,
				projects: [],
			});
		}

		teamMap.get(team.id)!.projects.push(projectData);
	});

	return Array.from(teamMap.values());
};
