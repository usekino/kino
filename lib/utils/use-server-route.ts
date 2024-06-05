import { useEffect, useState } from 'react';

import { env } from '@/lib/env/client';
import { getValidSubdomain } from '@/lib/utils/get-valid-subdomain';

export const useServerRoute = ({
	teamSlug,
	projectSlug,
}: {
	teamSlug: string;
	projectSlug?: string;
}) => {
	const [subdomain, setSubdomain] = useState<string | null>(null);
	const [proto, setProto] = useState('');
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (mounted) {
			setSubdomain(getValidSubdomain(window.location.host));
			setProto(window.location.protocol);
		}
	}, [mounted]);

	const createRoute = (route: string, options?: { console?: boolean }) => {
		const { console = false } = options ?? {};

		const path = projectSlug ? `/${projectSlug}${route}` : route;

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
