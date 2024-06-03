import Link from 'next/link';

import { api } from '@/lib/trpc/clients/server-invoker';

import { DashboardLinks } from './dashboard-links';
import Switcher from './switcher';

// type DashboardNavProps = React.HTMLAttributes<HTMLElement> & {};

export const DashboardNav = async () => {
	const teams = await api.team.findByMembership();
	const { projects, selected, containsProject } = await api.dashboard.userProjects();

	if (!containsProject || !teams) {
		return null;
	}

	return (
		<div className='flex h-full flex-col items-start gap-3 border-r p-4'>
			<Link
				href='/'
				className='mr-6 font-bold tracking-widest hover:underline hover:decoration-2 hover:underline-offset-2'
			>
				KINO
			</Link>
			<DashboardLinks selected={selected} />
			<div className='mt-auto'>
				<Switcher projectsByTeam={projects} selected={selected} />
			</div>
		</div>
	);
};
