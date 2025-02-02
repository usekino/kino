// import type { LayoutProps } from '../../_types';

// import { redirect } from 'next/navigation';

// import { getUser } from '@/lib/auth/utils';
// import { env } from '@/lib/env/server';

// import { deconstructTeamParam } from '../../_lib/deconstruct-team-param';
import { ConsoleNav } from './p/[project]/_components/console-nav';
import { SidebarWithContent } from './p/[project]/_components/sidebar-with-content';

export default async function ConsoleLayout({
	children,
	// params
}: {
	children: React.ReactNode;
}) {
	// const user = await getUser();
	// const { subdomain: teamSlug } = deconstructTeamParam((await params).team);

	// if (!user) {
	// 	return redirect(`https://${teamSlug}.${env.NEXT_PUBLIC_ROOT_DOMAIN}/sign-in`);
	// }

	return (
		<div className='relative flex h-svh w-full'>
			<SidebarWithContent sidebar={<ConsoleNav />}>
				{/*  */}
				{children}
			</SidebarWithContent>
		</div>
	);
}
