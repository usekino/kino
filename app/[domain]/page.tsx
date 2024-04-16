import { getUser } from '@/lib/auth/utils';

import { DomainPageParams, getTeam } from './_lib/utils';

export default async function DomainPage({ params }: DomainPageParams) {
	const user = await getUser();

	const team = await getTeam({
		domain: params.domain,
		user,
	});

	return (
		<div>
			<h1>{team.name}</h1>
			<p>{team.description}</p>
			{team.githubUrl && <a href={team.githubUrl}>{team.githubUrl}</a>}
			{team.userIsOwner && <a href={`/app?team=${team.subdomain}`}>Dashboard</a>}
		</div>
	);
}
