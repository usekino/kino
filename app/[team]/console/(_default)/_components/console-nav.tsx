import { getUser } from '@/lib/auth/utils';
import { api } from '@/lib/trpc/clients/server-invoker';

import { ConsoleLinks } from './console-links';
import { ToggleSidebarButton } from './sidebar-with-content';
import Switcher from './switcher';
import { UserButton } from './user-button';

export const ConsoleNav = async () => {
	const user = await getUser();
	const teams = await api.team.getUserTeams();
	const projects = await api.project.getUserProjects({ groupByTeam: true });

	if (!projects || !user || !teams) {
		return <div title='There was an error loading the switcher'>❌</div>;
	}

	return (
		<div className='flex h-full flex-col items-start gap-3 border-r'>
			<div className='w-full p-3'>
				<Switcher projects={projects} />
			</div>
			<div className='w-full px-3 py-1'>
				<ConsoleLinks />
			</div>
			<div className='mt-auto flex w-full flex-col items-center justify-center p-3'>
				<ToggleSidebarButton className='flex w-full justify-start' />
				<UserButton />
			</div>
		</div>
	);
};
