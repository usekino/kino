import { redirect } from 'next/navigation';

import { getUser } from '@/lib/auth/utils';
import { env } from '@/lib/env/server';

import { deconstructTeamSlug } from '../_lib/get-team';
import { ConsoleNav } from './_components/console-nav';
import { SidebarWithContent } from './_components/sidebar-with-content';
import { LayoutProps } from './_types';

export default async function ConsoleLayout({ children, params }: LayoutProps) {
	const user = await getUser();
	const { subdomain: teamSlug } = deconstructTeamSlug(params.team);

	if (!user) {
		return redirect(`https://${teamSlug}.${env.NEXT_PUBLIC_ROOT_DOMAIN}/sign-in`);
	}

	return (
		<div className='relative flex h-svh w-full'>
			<SidebarWithContent sidebar={<ConsoleNav />} children={children} />
			{/* <div className='hidden h-full min-w-[225px] bg-muted lg:fixed lg:block'>
				<ConsoleNav />
			</div>
			<div className='h-full w-full lg:ml-[225px]'>{children}</div> */}
		</div>
	);
}
