// import { notFound } from 'next/navigation';

import type { PageProps } from '../_types';

import { getUser } from '@/lib/auth/utils';
import { getTeamData } from '@/lib/db/prepared';

import { deconstructTeamParam } from './deconstruct-team-param';

// TODO this is a band-aid to fix type here
export type TeamPageParams = {
	params: Promise<{
		team: string;
	}>;
};

export const getTeam = async ({
	teamParam,
}: {
	teamParam: Awaited<PageProps['params']>['team'];
}) => {
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
