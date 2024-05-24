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

	console.log({ selected });

	return (
		<div className='container flex items-center justify-between gap-3 py-2.5'>
			<div className='flex'>
				<DashboardLinks selected={selected} />
			</div>
			<div className='flex items-center gap-2'>
				<Switcher projectsByTeam={projects} selected={selected} />
			</div>
		</div>
	);
};
