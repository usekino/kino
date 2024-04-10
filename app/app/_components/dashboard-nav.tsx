import Link from 'next/link';

import { cn } from '@/lib/utils';

export const DashboardNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
	return (
		<div className='border-b'>
			<div className='px-6 py-6 md:px-10'>
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
						href='/app/user'
						className='font-medium transition-colors hover:text-stone-950 hover:underline dark:hover:text-primary'
					>
						User
					</Link>
					<Link
						href='/app/resend'
						className='font-medium transition-colors hover:text-stone-950 hover:underline dark:hover:text-primary'
					>
						Resend
					</Link>
				</nav>
			</div>
		</div>
	);
};