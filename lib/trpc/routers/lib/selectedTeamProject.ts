import type { TeamProjectSelect } from '@/lib/schema/dashboard.schema';
import type { User } from 'lucia';

import { query } from '@/lib/db/upstash';

export const teamProjectSelect = query.createCollection<TeamProjectSelect>('selectedTeamProjects');

export const teamProjectSelectIndex = teamProjectSelect.createIndex({
	name: 'selected_team_project_by_user_id',
	terms: ['userId'],
});

export const getTeamProjectSelect = async (user: User) => {
	const selected = await teamProjectSelectIndex
		.match({
			userId: user.id,
		})
		.then((result) => result[0]?.data ?? null);

	if (!selected) {
		await teamProjectSelect.set(user.id, {
			userId: user.id,
			team: {
				id: '', // fix this
				slug: '', // fix this
			},
		});
	}

	return selected;
};
