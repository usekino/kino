import { getPathname } from '@nimpl/getters/get-pathname';
import { Home, Map, MessageSquare, Rss } from 'lucide-react';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const ProjectLinks = async ({ projectSlug }: { projectSlug: string }) => {
	const pathname = getPathname();

	const links = [
		{
			text: 'Dashboard',
			href: `/p/${projectSlug}`,
			icon: Home,
			className: '',
		},
		{
			text: 'Feedback',
			href: `/p/${projectSlug}/feedback`,
			icon: MessageSquare,
			className: '',
		},
		{
			text: 'Roadmap',
			href: `/p/${projectSlug}/roadmap`,
			icon: Map,
			className: '',
		},
		{
			text: 'Updates',
			href: `/p/${projectSlug}/updates`,
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
