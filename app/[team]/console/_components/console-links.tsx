'use client';

import type { TeamProjectSelect } from '@/lib/schema/dashboard.schema';

import { Home, MessageSquare, Rss, Settings } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useLinks } from '@/lib/utils/use-links';

export const ConsoleLinks = ({}: { selected: TeamProjectSelect }) => {
	const params = useParams();

	const { links, isActive } = useLinks({
		base: `/console/p/${params.project}`,
		links: [
			{
				title: 'Dashboard',
				href: ``,
				icon: Home,
				className: '',
			},
			{
				title: 'Feedback',
				href: `/feedback`,
				icon: MessageSquare,
				className: '',
			},
			{
				title: 'Updates',
				href: `/updates`,
				icon: Rss,
				className: '',
			},
			{
				title: 'Settings',
				href: `/settings`,
				icon: Settings,
				className: '',
			},
		],
	});

	return (
		<nav className={cn('flex w-full flex-col items-center gap-2')}>
			{links?.map((link) => {
				const active = isActive(link);
				return (
					<Link
						key={link.href}
						href={link.href}
						className={cn(
							'flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-sm font-medium transition-colors',
							'hocus:bg-accent/50',
							active ? 'bg-accent text-accent-foreground hocus:bg-accent' : '',
							link.className
						)}
					>
						{/* {path} - {link.href.replace(base, '')} */}
						<span className='inline-flex items-center gap-3 text-sm'>
							<link.icon className={cn(active ? 'opacity-100' : 'opacity-50')} size={16} />
							{link.title}
						</span>
					</Link>
				);
			})}
		</nav>
	);
};
