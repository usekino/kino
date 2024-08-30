import type { DashboardSchema } from '@/lib/schema/dashboard.schema';
import type { User } from 'lucia';

import { query } from '@/lib/db/upstash';

export const teamProjectSelect =
	query.createCollection<DashboardSchema['TeamProjectSelect']>('selectedTeamProjects');

export const teamProjectSelectIndex = teamProjectSelect.createIndex({
	name: 'selected_team_project_by_user_id',
	terms: ['userId'],
});

export const getTeamProjectSelect = async (
	userId: User['id'],
	defaultProject?: DashboardSchema['TeamProjectSelect']
) => {
	const selected = await teamProjectSelectIndex
		.match({
			userId,
		})
		.then((result) => result[0]?.data ?? null);

	if (!selected) {
		if (!defaultProject) {
			return null;
		}
		await teamProjectSelect.set(userId, defaultProject);
	}

	return selected;
};
