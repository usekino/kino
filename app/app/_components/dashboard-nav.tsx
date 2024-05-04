import Link from 'next/link';

import { api } from '@/lib/trpc/clients/server-invoker';

import { DashboardLinks } from './dashboard-links';
import Switcher from './switcher';

// type DashboardNavProps = React.HTMLAttributes<HTMLElement> & {};

export const DashboardNav = async () => {
	const selected = await api.dashboard.selected();
	const projects = await api.dashboard.projectsByTeam({
		teamId: selected.team.id,
	});

	return (
		<div className='container flex items-center justify-between gap-3 py-2.5'>
			<div className='flex'>
				<DashboardLinks />
			</div>
			{projects.length > 0 && selected ? (
				<div className='flex items-center gap-2'>
					<Switcher projectsByTeam={projects} selected={selected} />
				</div>
			) : (
				<div className='w-full'>
					<Link href='/create/project' className='hover:underline'>
						Add a project
					</Link>
				</div>
			)}
		</div>
	);
};
