import type { LucideIcon } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import Link from 'next/link';

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
			<header className='border-y'>
				<div className='flex items-center gap-4 px-8 pb-4 pt-12'>
					<Icon size={24} />
					<h1 className='text-2xl font-medium md:text-3xl'>{title}</h1>
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
