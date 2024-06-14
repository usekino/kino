'use server';

import { getPathname } from '@nimpl/getters/get-pathname';
import { headers } from 'next/headers';

import { env } from '@/lib/env/server';
import { getValidSubdomain } from '@/lib/utils/get-valid-subdomain';

export const serverRoute = async ({
	teamSlug,
	projectSlug,
}: {
	teamSlug?: string;
	projectSlug?: string;
}) => {
	const pathname = getPathname();
	const host = headers().get('host');
	const subdomain = getValidSubdomain(host);
	const proto = headers().get('x-forwarded-proto') ?? 'https';

	const getValidatedTeamSlug = () => {
		if (!!teamSlug) return teamSlug;
		if (subdomain && subdomain !== 'console') return subdomain;

		throw new Error('Team slug not found');
	};

	const createRoute = (route: string, options?: { console?: boolean }) => {
		const { console = false } = options ?? {};

		const path = projectSlug ? `/${projectSlug}${route}` : route;

		if (console) {
			return `${proto}://console.${env.NEXT_PUBLIC_ROOT_DOMAIN}/${getValidatedTeamSlug()}${path}`;
		}

		if (!!subdomain && subdomain !== 'console') {
			return `${proto}://${subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}${path}`;
		} else {
			return `/${getValidatedTeamSlug()}${path}`;
		}
	};

	const checkRoute = (route: string) => {
		console.log('checkRoute', route, pathname);
		if (pathname) {
			if ((!!subdomain && subdomain !== 'console') || route.includes(`http`)) {
				return route === `${proto}://${subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}${pathname}`;
			} else {
				return route === pathname;
			}
		}
		return false;
	};

	return { createRoute, checkRoute };
};
