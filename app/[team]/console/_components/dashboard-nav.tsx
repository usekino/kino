import Link from 'next/link';

import { api } from '@/lib/trpc/clients/server-invoker';

import { DashboardLinks } from './dashboard-links';
import Switcher from './switcher';

export const DashboardNav = async () => {
	const teams = await api.team.findByMembership();
	const { projects, selected, containsProject } = await api.dashboard.userProjects();

	if (!containsProject || !teams) {
		return null;
	}

	return (
		<div className='flex h-full flex-col items-start gap-3 border-r'>
			<div className='w-full border-b bg-accent/20 p-3 text-center'>
				<Link
					href='/console'
					className='font-bold tracking-widest hover:underline hover:decoration-2 hover:underline-offset-2'
				>
					KINO
				</Link>
			</div>
			<div className='p-3'>
				<Switcher projectsByTeam={projects} selected={selected} />
			</div>
			<div className='w-full px-3 py-1'>
				<DashboardLinks selected={selected} />
			</div>
		</div>
	);
};
