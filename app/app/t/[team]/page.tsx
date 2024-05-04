import { notFound } from 'next/navigation';

import { api } from '@/lib/trpc/clients/server-invoker';

export default async function DashTeamPage({
	params,
}: {
	params: {
		team: string;
	};
}) {
	const { team: slug } = params;

	const team = slug
		? await api.team.findBySlug({
				slug,
			})
		: null;

	if (!team) {
		notFound();
	}

	return (
		<div>
			<h1>{team?.name}</h1>
			<p>{team?.description}</p>
		</div>
	);
}
