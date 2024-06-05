import { getPathname } from '@nimpl/getters/get-pathname';
import { Blocks, Bug, GalleryVerticalEnd, Gift } from 'lucide-react';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { serverRoute } from '@/lib/utils/server-route';

import { AddDialog } from './add-dialog';

type Props = {
	teamSlug: string;
	projectSlug: string;
};

export const ListSidebar = async (props: Props) => {
	const pathname = getPathname();

	const route = await serverRoute({
		teamSlug: props.teamSlug,
		projectSlug: props.projectSlug,
	});

	const links = [
		{
			title: 'All',
			href: route(`/feedback`),
			icon: GalleryVerticalEnd,
		},
		{
			title: 'Bugs',
			href: route(`/feedback/bugs`),
			icon: Bug,
		},
		{
			title: 'Features',
			href: route(`/feedback/features`),
			icon: Gift,
		},
		{
			title: 'Improvements',
			href: route(`/feedback/improvements`),
			icon: Blocks,
		},
	];
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
							pathname === link.href ? 'bg-accent text-accent-foreground' : ''
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
