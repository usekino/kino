import type { PageProps } from '../_types';

import { env } from '@/lib/env/client';

export const deconstructTeamParam = (teamParam: PageProps['params']['team']) => {
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
