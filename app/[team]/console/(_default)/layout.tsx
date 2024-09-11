import { redirect } from 'next/navigation';

import { getUser } from '@/lib/auth/utils';
import { env } from '@/lib/env/server';

import { deconstructTeamParam } from '../../_lib/get-team';
import { LayoutProps } from '../../_types';
import { ConsoleNav } from './p/[project]/_components/console-nav';
import { SidebarWithContent } from './p/[project]/_components/sidebar-with-content';

export default async function ConsoleLayout({ children, params }: LayoutProps) {
	const user = await getUser();
	const { subdomain: teamSlug } = deconstructTeamParam(params.team);

	if (!user) {
		return redirect(`https://${teamSlug}.${env.NEXT_PUBLIC_ROOT_DOMAIN}/sign-in`);
	}

	return (
		<div className='relative flex h-svh w-full'>
			<SidebarWithContent sidebar={<ConsoleNav />} children={children} />
		</div>
	);
}
