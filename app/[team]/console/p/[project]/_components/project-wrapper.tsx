import type { LucideIcon } from 'lucide-react';

import Link from 'next/link';

import { Heading } from '@/components/heading';

type LinkData = {
	href: string;
	title: string;
};

// Props with children type
type ProjectHeaderProps = {
	icon: LucideIcon;
	title: string;
	links?: LinkData[];
};

export const ProjectWrapper = ({ icon: Icon, title, links }: ProjectHeaderProps) => {
	return (
		<>
			<header className='bg-header border-y'>
				<div className='flex items-center gap-4 px-8 pb-4 pt-12'>
					<Icon size={24} />
					<Heading tag='h1' variant='h2'>
						{title}
					</Heading>
				</div>

				{links && (
					<nav className='px-8'>
						<div className='flex items-center gap-8 py-3'>
							{links.map((link) => (
								<Link key={link.title} href={link.href} className='hocus:underline'>
									{link.title}
								</Link>
							))}
						</div>
					</nav>
				)}
			</header>
		</>
	);
};
