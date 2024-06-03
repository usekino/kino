// import { getPathname } from '@nimpl/getters/get-pathname';
// import { redirect } from 'next/navigation';

import { MainNav } from '@/components/section/main-nav';

// import { getUser } from '@/lib/auth/utils';
// import { env } from '@/lib/env/server';
// import { api } from '@/lib/trpc/clients/server-invoker';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
	// const user = await getUser();
	// const { containsProject } = await api.dashboard.userProjects();
	// const pathname = getPathname();

	// No user signed in
	// if (!user) {
	// 	redirect(`${env.NEXT_PUBLIC_ROOT_DOMAIN}/sign-in`);
	// }

	// No project created yet
	// if (!containsProject && !['/create/project', '/create/team'].includes(pathname ?? '')) {
	// 	redirect('/create/project');
	// }

	return (
		<main>
			<div className='flex h-screen'>
				<div className='flex h-screen w-full flex-col'>
					<div className='bg-card'>
						<MainNav dashboard={true} />
					</div>
					<div className='flex-auto'>{children}</div>
				</div>
			</div>
		</main>
	);
}
