'use client';

import { Blocks, Bug, GalleryVerticalEnd, Gift } from 'lucide-react';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLinks } from '@/lib/utils/use-links';

import { AddDialog } from './add-dialog';

type Props = {
	teamSlug: string;
	projectSlug: string;
};

export const ListSidebar = ({ projectSlug }: Props) => {
	const { links } = useLinks({
		base: `/p/${projectSlug}/feedback`,
		links: [
			{
				title: 'All',
				href: ``,
				icon: GalleryVerticalEnd,
			},
			{
				title: 'Bugs',
				href: `/bugs`,
				icon: Bug,
			},
			{
				title: 'Features',
				href: `/features`,
				icon: Gift,
			},
			{
				title: 'Improvements',
				href: `/improvements`,
				icon: Blocks,
			},
		],
	});

	return (
		<div className='flex flex-col gap-4'>
			<div>
				<AddDialog />
			</div>
			<span className='font-bold'>Boards</span>
			<nav className='flex flex-col gap-1'>
				{links.map((link) => (
					<Link
						key={link.title}
						href={link.href}
						className={cn(
							buttonVariants({
								variant: 'ghost',
							}),
							'justify-start gap-3 hocus:underline',
							link.active ? 'bg-accent text-accent-foreground' : ''
						)}
					>
						<link.icon size={16} />
						<span>{link.title}</span>
					</Link>
				))}
			</nav>
		</div>
	);
};
