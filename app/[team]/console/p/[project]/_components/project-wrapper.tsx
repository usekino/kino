import type { LucideIcon } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import Link from 'next/link';

type LinkData = {
	href: string;
	title: string;
};

// Props with children type
type ProjectHeaderProps = PropsWithChildren<{
	icon: LucideIcon;
	title: string;
	links?: LinkData[];
}>;

export const ProjectWrapper = ({ icon: Icon, title, links, children }: ProjectHeaderProps) => {
	return (
		<>
			<header className='border-y bg-diagonal bg-[length:10px_10px]'>
				<div className='container flex items-center gap-4 pb-6 pt-12'>
					<Icon size={30} />
					<h1 className='text-3xl font-medium md:text-4xl'>{title}</h1>
				</div>

				{links && (
					<nav className='border-t bg-background'>
						<div className='container flex items-center gap-8 py-3'>
							{links.map((link) => (
								<Link key={link.title} href={link.href} className='hocus:underline'>
									{link.title}
								</Link>
							))}
						</div>
					</nav>
				)}
			</header>
			{children}
		</>
	);
};
