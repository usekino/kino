import type { User } from 'lucia';

import { notFound } from 'next/navigation';

import { getTeamData } from '@/lib/db/prepared';
import { env } from '@/lib/env/server';

export type Domain = string;
export type DomainPageParams = {
	params: {
		domain: Domain;
	};
};

export const getTeam = async (args: { user?: User | null; domain: Domain }) => {
	const domain = decodeURIComponent(args.domain);
	const subdomain = domain.includes(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) ? domain.split('.')[0] : '';

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
