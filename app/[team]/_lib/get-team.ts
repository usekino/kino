// import { notFound } from 'next/navigation';

import { getUser } from '@/lib/auth/utils';
import { getTeamData } from '@/lib/db/prepared';

import { PageProps } from '../_types';
import { deconstructTeamParam } from './deconstruct-team-param';

export const getTeam = async ({ teamParam }: { teamParam: PageProps['params']['team'] }) => {
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
