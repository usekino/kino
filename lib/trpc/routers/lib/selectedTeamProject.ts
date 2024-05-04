import { query } from '@/lib/db/upstash';
import { TeamProjectSelect } from '@/lib/validation/dashboard-validation';

export const teamProjectSelect = query.createCollection<TeamProjectSelect>('selectedTeamProjects');

export const getTeamProjectSelect = teamProjectSelect.createIndex({
	name: 'selected_team_project_by_user_id',
	terms: ['userId'],
});
