import { redirect } from 'next/navigation';

import { api } from '@/lib/trpc/clients/server-invoker';

export default async function AppHome() {
	const selected = await api.dashboard.selected();
	if (!selected) {
		redirect('/sign-in');
	}
	const project = selected.project ? `/project/${selected.project.slug}/` : '';
	redirect(`/team/${selected.team.slug}${project}`);
}
