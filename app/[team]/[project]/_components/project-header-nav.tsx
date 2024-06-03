'use client';

import { Home, Map, MessageSquare, Rss } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const ProjectLinks = () => {
	const pathname = usePathname();
	const params = useParams();

	const base = `/~/${params.team}/${params.project}`;

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
			text: 'Roadmap',
			href: `${base}/roadmap`,
			icon: Map,
			className: '',
		},
		{
			text: 'Updates',
			href: `${base}/updates`,
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
							size: 'sm',
						}),
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
