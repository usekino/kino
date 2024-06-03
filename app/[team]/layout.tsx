import type { PropsWithChildren } from 'react';
import type { TeamPageParams } from './_lib/server-utils';

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
						<MainNav dashboard={false} />
					</div>
					{children}
				</div>
			</div>
		</main>
	);
}
