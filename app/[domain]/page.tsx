import { getUser } from '@/lib/auth/utils';

import type { DomainPageParams} from './_lib/utils';
import { getTeam } from './_lib/utils';

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
			{team.userIsOwner && <a href={`/app?team=${team.subdomain}`}>Dashboard</a>}
		</div>
	);
}
