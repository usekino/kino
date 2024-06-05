import type { TeamPageParams } from '@/lib/util/server-utils';
import type { PropsWithChildren } from 'react';

// import { redirect } from 'next/navigation';

import { MainNav } from '@/components/section/main-nav';

// import { getTeam } from './_lib/utils';

export default async function DomainLayout({
	// params,
	children,
}: PropsWithChildren<TeamPageParams>) {
	// const team = await getTeam({
	// 	team: params.team,
	// });

	// TODO: Redirect to custom domain
	// if (team.decodedDomain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) && team.customDomain) {
	// 	return redirect(`https://${team.customDomain}`);
	// }

	return (
		<main>
			<div className='flex h-screen'>
				<div className='w-full'>
					<div className='border'>
						<MainNav />
					</div>
					{children}
				</div>
			</div>
		</main>
	);
}
