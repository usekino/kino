'use server';

import type { User } from 'lucia';

import { headers } from 'next/headers';
// import { getPathname } from '@nimpl/getters/get-pathname';
import { notFound } from 'next/navigation';

import { getTeamData } from '@/lib/db/prepared';
import { env } from '@/lib/env/server';
import { getValidSubdomain } from '@/lib/util/get-valid-subdomain';

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

export const serverRoute = async (teamSlug: string) => {
	const host = headers().get('host');
	const subdomain = await getValidSubdomain(host);
	const proto = headers().get('x-forwarded-proto') ?? 'https';

	const createRoute = (route: string, options?: { console?: boolean }) => {
		const { console = false } = options ?? {};

		if (console) {
			return `${proto}://console.${env.NEXT_PUBLIC_ROOT_DOMAIN}/${teamSlug}${route}`;
		}

		if (!!subdomain && subdomain !== 'console') {
			return `${proto}://${subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}${route}`;
		} else {
			return `/${teamSlug}${route}`;
		}
	};

	return createRoute;
};
