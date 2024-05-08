import type { TeamProjectSelect } from '@/lib/schema/dashboard.schema';

import { query } from '@/lib/db/upstash';

export const teamProjectSelect = query.createCollection<TeamProjectSelect>('selectedTeamProjects');

export const getTeamProjectSelect = teamProjectSelect.createIndex({
	name: 'selected_team_project_by_user_id',
	terms: ['userId'],
});
