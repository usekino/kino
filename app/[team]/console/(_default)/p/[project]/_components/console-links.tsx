'use client';

import type { LucideIcon } from 'lucide-react';

import { useContext } from 'react';
import { Home, Map, MessageSquare, Rss, Settings } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useLinks } from '@/lib/utils/use-links';

import { SidebarContext } from './sidebar-with-content';

const ConsoleLink = ({
	active,
	className,
	href,
	icon: Icon,
	title,
}: {
	active: boolean;
	className: string;
	href: string;
	icon: LucideIcon;
	title: string;
}) => {
	const { open: sidebarOpen } = useContext(SidebarContext);
	return (
		<TooltipProvider key={href}>
			<Tooltip delayDuration={100} open={sidebarOpen ? false : undefined}>
				<TooltipTrigger asChild>
					<Link
						href={href}
						className={cn(
							'group flex w-full items-center justify-between gap-2 rounded-md px-2.5 transition-colors',
							'text-sm hocus:bg-accent/50',
							active ? 'bg-accent text-accent-foreground hocus:bg-accent' : '',
							sidebarOpen ? 'py-2' : 'py-2.5',
							className
						)}
					>
						<span
							className={cn(
								'inline-flex items-center gap-3 text-sm transition-all',
								'group-hocus:opacity-100',
								active ? 'opacity-100' : 'opacity-50'
							)}
						>
							<Icon size={16} />
							<span>{sidebarOpen ? title : null}</span>
						</span>
					</Link>
				</TooltipTrigger>
				<TooltipContent side='right' className='z-20'>
					<p>{title}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export const ConsoleLinks = () => {
	const params = useParams();

	const base = `/console/p/${params.project}`;

	const { links: topLinks } = useLinks({
		base,
		links: [
			{
				title: 'Dashboard',
				href: ``,
				icon: Home,
				group: 'top',
				className: '',
			},
		],
	} as const);

	const { links: featureLinks } = useLinks({
		base: `/console/p/${params.project}`,
		links: [
			{
				title: 'Feedback',
				href: `/feedback`,
				icon: MessageSquare,
				group: 'feature',
				className: '',
			},
			{
				title: 'Updates',
				href: `/updates`,
				icon: Rss,
				group: 'feature',
				className: '',
			},
			{
				title: 'Roadmap',
				href: `/roadmap`,
				icon: Map,
				group: 'feature',
				className: '',
			},
		],
	} as const);

	const { links: systemLinks } = useLinks({
		base,
		links: [
			{
				title: 'Settings',
				href: `/settings`,
				icon: Settings,
				group: 'system',
				className: '',
			},
		],
	} as const);

	return (
		<nav className={cn('flex w-full flex-col items-center gap-2')}>
			{topLinks?.map((link) => <ConsoleLink key={link.passedHref} {...link} />)}
			<Separator />
			{featureLinks?.map((link) => <ConsoleLink key={link.passedHref} {...link} />)}
			<Separator />
			{systemLinks?.map((link) => <ConsoleLink key={link.passedHref} {...link} />)}
		</nav>
	);
};
