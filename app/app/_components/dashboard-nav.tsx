import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { env } from '@/lib/env/server';
import { cn } from '@/lib/utils';

import TeamSwitcher from './team-switcher';

export const DashboardNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
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
				<div className='flex items-center gap-6'>
					<TeamSwitcher />
					<a
						href={`https://acme.${env.NEXT_PUBLIC_ROOT_DOMAIN}`}
						className='inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary hover:underline'
					>
						Public view
						<ExternalLink size={16} />
					</a>
				</div>
			</div>
		</div>
	);
};
