'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLinks } from '@/lib/utils/use-links';

export const SettingsNav = () => {
	const params = useParams();

	const { links, isActive } = useLinks({
		base: `/console/p/${params.project}/roadmap`,
		links: [
			{
				title: 'All feedback',
				href: ``,
			},
			{
				title: 'Boards',
				href: `/boards`,
			},
			{
				title: 'Settings',
				href: `/settings`,
			},
		],
	});

	return (
		<nav className='inline-flex items-center gap-2 px-6 pb-2'>
			{links?.map((link) => {
				const active = isActive(link);
				return (
					<Link
						key={`project-link-${link.href}`}
						href={link.href}
						className={cn(
							buttonVariants({
								variant: 'ghost',
								size: 'xs',
							}),
							'text-native-foreground/70',
							active
								? 'bg-accent text-accent-foreground hover:!bg-accent hover:!text-accent-foreground focus:!bg-accent focus:!text-accent-foreground'
								: ''
						)}
					>
						<span className='inline-flex items-center gap-2 text-sm'>{link.title}</span>
					</Link>
				);
			})}
		</nav>
	);
};
