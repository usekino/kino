'use client';

import { Home, MessageSquare, Rss, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { splitPathAfterProject } from '../_lib/splitPathAfterProject';

export const DashboardLinks = () => {
	const pathname = usePathname();
	const path = splitPathAfterProject(pathname);
	const base = path ? pathname.split(path)[0].replace(/\/$/, '') : pathname;

	const links = [
		{
			text: 'Dashboard',
			href: base,
			icon: Home,
			className: '',
		},
		{
			text: 'Feedback',
			href: `${base}/feedback`,
			icon: MessageSquare,
			className: '',
		},
		{
			text: 'Updates',
			href: `${base}/updates`,
			icon: Rss,
			className: '',
		},
		{
			text: 'Settings',
			href: `${base}/settings`,
			icon: Settings,
			className: '',
		},
	];

	return (
		<nav className={cn('flex items-center gap-2')}>
			{links.map((link) => (
				<Link
					key={link.href}
					href={link.href}
					className={cn(
						'flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors',
						'hocus:bg-accent',
						link.href === pathname ? 'bg-primary text-primary-foreground hocus:bg-primary' : '',
						link.className
					)}
				>
					<span className='inline-flex items-center gap-2 text-sm'>
						<link.icon size={12} />
						{link.text}
					</span>
				</Link>
			))}
		</nav>
	);
};
