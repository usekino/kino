'use client';

// import { getPathname } from '@nimpl/getters/get-pathname';
import { Blocks, Bug, GalleryVerticalEnd, Gift } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// import { serverRoute } from '@/lib/utils/server-route';

import { AddDialog } from './add-dialog';

type Props = {
	teamSlug: string;
	projectSlug: string;
};

export const ListSidebar = ({ projectSlug }: Props) => {
	const pathname = usePathname();

	// const { createRoute, checkRoute } = await serverRoute({
	// 	teamSlug: props.teamSlug,
	// 	projectSlug: props.projectSlug,
	// });

	const base = `/p/${projectSlug}/feedback`;

	const links = [
		{
			title: 'All',
			href: `${base}`,
			icon: GalleryVerticalEnd,
		},
		{
			title: 'Bugs',
			href: `${base}/bugs`,
			icon: Bug,
		},
		{
			title: 'Features',
			href: `${base}/features`,
			icon: Gift,
		},
		{
			title: 'Improvements',
			href: `${base}/improvements`,
			icon: Blocks,
		},
	];

	// console.log({ pathname, base, links });

	return (
		<div className='flex flex-col gap-4'>
			<div>
				<AddDialog />
			</div>
			<span className='font-bold'>Boards</span>
			<nav className='flex flex-col gap-1'>
				{links.map((link) => {
					const path = pathname.replace(base, '');
					const active = !path ? link.href === base : link.href.replace(base, '').startsWith(path);

					return (
						<Link
							key={link.title}
							href={link.href}
							className={cn(
								buttonVariants({
									variant: 'ghost',
								}),
								'justify-start gap-3 hocus:underline',
								active ? 'bg-accent text-accent-foreground' : ''
							)}
						>
							<link.icon size={16} />
							<span>{link.title}</span>
						</Link>
					);
				})}
			</nav>
		</div>
	);
};
