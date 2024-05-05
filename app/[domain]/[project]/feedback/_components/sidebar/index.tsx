import { Blocks, Bug, GalleryVerticalEnd, Gift } from 'lucide-react';
import Link from 'next/link';

export const ListSidebar = () => {
	const links = [
		{
			title: 'All',
			href: '/',
			icon: GalleryVerticalEnd,
		},
		{
			title: 'Bugs',
			href: '/',
			icon: Bug,
		},
		{
			title: 'Features',
			href: '/',
			icon: Gift,
		},
		{
			title: 'Improvements',
			href: '/',
			icon: Blocks,
		},
	];
	return (
		<div className='flex flex-col gap-4'>
			<span className='font-bold'>Boards</span>
			<nav className='flex flex-col gap-3'>
				{links.map((link) => (
					<Link
						key={link.title}
						href={link.href}
						className='inline-flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent hover:underline'
					>
						<link.icon size={16} />
						<span>{link.title}</span>
					</Link>
				))}
			</nav>
		</div>
	);
};
