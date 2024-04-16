import { redirect } from 'next/navigation';

import { api } from '@/lib/trpc/clients/server-invoker';

export default async function AppHome() {
	// TODO: just make this not fucking stupid
	const teams = await api.team.findByOwnership();
	redirect(`/team/${teams[0].slug}`);
}
