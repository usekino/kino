'use server';

import { headers } from 'next/headers';

import { env } from '@/lib/env/server';
import { getValidSubdomain } from '@/lib/utils/get-valid-subdomain';

export const serverRoute = async ({
	teamSlug,
	projectSlug,
}: {
	teamSlug: string;
	projectSlug?: string;
}) => {
	const host = headers().get('host');
	const subdomain = getValidSubdomain(host);
	const proto = headers().get('x-forwarded-proto') ?? 'https';

	const createRoute = (route: string, options?: { console?: boolean }) => {
		const { console = false } = options ?? {};

		const path = projectSlug ? `/${projectSlug}${route}` : route;

		if (console) {
			return `${proto}://console.${env.NEXT_PUBLIC_ROOT_DOMAIN}/${teamSlug}${path}`;
		}

		if (!!subdomain && subdomain !== 'console') {
			return `${proto}://${subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}${path}`;
		} else {
			return `/${teamSlug}${path}`;
		}
	};

	return createRoute;
};
