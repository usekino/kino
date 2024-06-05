import { env } from 'process';

import { User } from 'lucia';
import { notFound } from 'next/navigation';

import { getTeamData } from '@/lib/db/prepared';

export type Team = string;
export type TeamPageParams = {
	params: {
		team: Team;
	};
};

export const getTeam = async (args: { user?: User | null; team: Team }) => {
	let domain: string | null = null;
	let subdomain: string | null = null;

	// If a domain is provided...
	if (args.team.includes('.')) {
		domain = decodeURIComponent(args.team);
		subdomain = domain.includes(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) ? domain.split('.')[0] : '';
	} else {
		subdomain = args.team;
	}

	const team = await getTeamData(subdomain);

	if (!team) {
		notFound();
	}

	return {
		customDomain: false, // TODO: implement custom domains, and remove this
		decodedDomain: domain,
		userIsOwner: !args.user || team.ownerId === args.user.id,
		subdomain,
		...team,
	};
};
