'use client';

import type { TeamProjectSelect } from '@/lib/schema/dashboard.schema';

import { Home, MessageSquare, Rss, Settings } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export const ConsoleLinks = ({ selected }: { selected: TeamProjectSelect }) => {
	const pathname = usePathname();
	const params = useParams();

	const project = () => {
		if (params.project) {
			return params.project;
		} else if (selected.project?.slug) {
			return selected.project.slug;
		}
		return '';
	};

	const base = `/console/p/${project()}`;

	const links = [
		{
			text: 'Dashboard',
			href: `${base}`,
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
		<nav className={cn('flex w-full flex-col items-center gap-2')}>
			{links.map((link) => (
				<Link
					key={link.href}
					href={link.href}
					className={cn(
						'flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-sm font-medium transition-colors',
						'hocus:bg-accent/50',
						link.href === pathname ? 'bg-accent text-accent-foreground hocus:bg-accent' : '',
						link.className
					)}
				>
					<span className='inline-flex items-center gap-3 text-sm'>
						<link.icon
							className={cn(link.href === pathname ? 'opacity-100' : 'opacity-50')}
							size={16}
						/>
						{link.text}
					</span>
				</Link>
			))}
		</nav>
	);
};
