import { getParams } from '@nimpl/getters/get-params';
import { getPathname } from '@nimpl/getters/get-pathname';
import { Home, Map, MessageSquare, Rss } from 'lucide-react';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { serverRoute } from '../../../../lib/utils/server-route';

type Params = {
	team: string;
	project: string;
};

export const ProjectLinks = async () => {
	const pathname = getPathname();
	const params = getParams() as Params;
	const route = await serverRoute({
		teamSlug: params.team,
		projectSlug: params.project,
	});

	const links = [
		{
			text: 'Dashboard',
			href: route(``),
			icon: Home,
			className: '',
		},
		{
			text: 'Feedback',
			href: route(`/feedback`),
			icon: MessageSquare,
			className: '',
		},
		{
			text: 'Roadmap',
			href: route(`/roadmap`),
			icon: Map,
			className: '',
		},
		{
			text: 'Updates',
			href: route(`/updates`),
			icon: Rss,
			className: '',
		},
	];

	return (
		<nav className={cn('inline-flex items-center gap-2')}>
			{links.map((link) => (
				<Link
					key={link.href}
					href={link.href}
					className={cn(
						buttonVariants({
							variant: 'ghost',
							size: 'xs',
						}),
						'text-native-foreground/70',
						link.href === pathname
							? 'bg-accent text-accent-foreground hover:!bg-accent hover:!text-accent-foreground focus:!bg-accent focus:!text-accent-foreground'
							: '',
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
