import Link from 'next/link';

import { api } from '@/lib/trpc/clients/server-invoker';
import { cn } from '@/lib/utils';

import TeamSwitcher from './team-switcher';

export const DashboardNav = async ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
	const teams = await api.team.findByOwnership();

	return (
		<div className='border-b bg-transparent bg-[repeating-linear-gradient(45deg,hsl(var(--border))_0,hsl(var(--border))_1px,transparent_0,transparent_50%)] bg-[length:10px_10px]'>
			<div className='flex items-end px-6 py-6 md:px-10'>
				<div className='flex-auto'>
					<h1 className='mb-3 mt-10 text-3xl font-bold'>Dashboard</h1>
					<nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
						<Link
							href='/app'
							className='font-medium transition-colors hover:text-stone-950 hover:underline dark:hover:text-primary'
						>
							Dashboard
						</Link>
						<Link
							href='/app/settings'
							className='font-medium transition-colors hover:text-stone-950 hover:underline dark:hover:text-primary'
						>
							Settings
						</Link>
						<Link
							href='/app/account'
							className='font-medium transition-colors hover:text-stone-950 hover:underline dark:hover:text-primary'
						>
							Account
						</Link>
						<Link
							href='/app/resend'
							className='font-medium transition-colors hover:text-stone-950 hover:underline dark:hover:text-primary'
						>
							Resend
						</Link>
					</nav>
				</div>

				<TeamSwitcher teams={teams} />
			</div>
		</div>
	);
};
