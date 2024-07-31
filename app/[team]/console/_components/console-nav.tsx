import { api } from '@/lib/trpc/clients/server-invoker';

import { ConsoleLinks } from './console-links';
import { ToggleSidebarButton } from './sidebar-with-content';
import Switcher from './switcher';
import { UserButton } from './user-button';

export const ConsoleNav = async () => {
	const teams = await api.team.findByMembership();
	const { projects, selected, containsProject } = await api.dashboard.userProjects();

	if (!containsProject || !teams) {
		return null;
	}

	return (
		<div className='flex h-full flex-col items-start gap-3 border-r'>
			<div className='w-full p-3'>
				<Switcher projectsByTeam={projects} selected={selected} />
			</div>
			<div className='w-full px-3 py-1'>
				<ConsoleLinks selected={selected} />
			</div>
			<div className='mt-auto flex w-full flex-col items-center justify-center p-3'>
				<ToggleSidebarButton className='flex w-full justify-start' />
				<UserButton />
			</div>
		</div>
	);
};
