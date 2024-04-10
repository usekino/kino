import type { ReactNode } from 'react';

import { redirect } from 'next/navigation';

import { MainNav } from '@/components/section/main-nav';
import { env } from '@/lib/env/server';

const temp_getSiteData = async (domain: string) => {
	const subdomain = domain.includes(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) ? domain.split('.')[0] : '';

	return {
		team: subdomain,
		customDomain: false, // TODO: check if domain is a custom domain
	};
};

export default async function DomainLayout({
	params,
	children,
}: {
	params: {
		domain: string;
	};
	children: ReactNode;
}) {
	const domain = decodeURIComponent(params.domain);
	const data = await temp_getSiteData(domain);

	if (domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) && data.customDomain) {
		return redirect(`https://${data.customDomain}`);
	}

	return (
		<main>
			<div className='flex h-screen'>
				<div className='w-full'>
					<MainNav />
					{children}
				</div>
			</div>
		</main>
	);
}
