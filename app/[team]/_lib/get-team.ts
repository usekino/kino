// import { notFound } from 'next/navigation';

import { getUser } from '@/lib/auth/utils';
import { getTeamData } from '@/lib/db/prepared';
import { env } from '@/lib/env/server';

export type Team = string;
export type TeamPageParams = {
	params: {
		team: Team;
	};
};

export const deconstructTeamParam = (teamParam: Team) => {
	let subdomain: string | null = null;
	let domain: string | null = null;

	// If a domain is provided...
	if (teamParam.includes('.')) {
		domain = decodeURIComponent(teamParam);
		subdomain = domain.includes(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) ? domain.split('.')[0] : '';
	} else {
		subdomain = teamParam;
	}

	return { subdomain, domain };
};

export const getTeam = async ({ teamParam }: { teamParam: Team }) => {
	const user = await getUser();

	const { subdomain, domain } = deconstructTeamParam(teamParam);
	const team = await getTeamData(subdomain);

	return {
		customDomain: false, // TODO: implement custom domains, and remove this
		decodedDomain: domain,
		userIsOwner: !user || team?.ownerId === user.id,
		subdomain,
		...team,
	};
};
