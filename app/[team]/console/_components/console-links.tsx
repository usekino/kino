'use client';

import type { TeamProjectSelect } from '@/lib/schema/dashboard.schema';

import { useContext } from 'react';
import { Home, Map, MessageSquare, Rss, Settings } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useLinks } from '@/lib/utils/use-links';

import { SidebarContext } from './sidebar-with-content';

export const ConsoleLinks = ({}: { selected: TeamProjectSelect }) => {
	const params = useParams();

	const { open: sidebarOpen } = useContext(SidebarContext);

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
				title: 'Roadmap',
				href: `/roadmap`,
				icon: Map,
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
					<TooltipProvider key={link.href}>
						<Tooltip delayDuration={100} open={sidebarOpen ? false : undefined}>
							<TooltipTrigger asChild>
								<Link
									href={link.href}
									className={cn(
										'group flex w-full items-center justify-between gap-2 rounded-md px-2.5 text-sm font-medium transition-colors',
										'hocus:bg-accent/50',
										active ? 'bg-accent text-accent-foreground hocus:bg-accent' : '',
										sidebarOpen ? 'py-2' : 'py-2.5',
										link.className
									)}
								>
									<span className='inline-flex items-center gap-3 text-sm'>
										<link.icon
											className={cn(
												'group-hocus:opacity-100',
												active ? 'opacity-100' : 'opacity-50'
											)}
											size={16}
										/>
										{sidebarOpen ? link.title : null}
									</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side='right' className='z-20'>
								<p>{link.title}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				);
			})}
		</nav>
	);
};
