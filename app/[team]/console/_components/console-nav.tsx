import Link from 'next/link';

import { api } from '@/lib/trpc/clients/server-invoker';

import { ConsoleLinks } from './console-links';
import Switcher from './switcher';

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
			<div className='mt-auto w-full border-t p-3 text-center'>
				<Link
					href='/console'
					className='tracking-widest hover:underline hover:decoration-2 hover:underline-offset-2'
				>
					User so and so
				</Link>
			</div>
		</div>
	);
};
