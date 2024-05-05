import type { LucideIcon } from 'lucide-react';

import Link from 'next/link';

type LinkData = {
	href: string;
	title: string;
};

type ProjectHeaderProps = {
	icon: LucideIcon;
	title: string;
	links?: LinkData[];
};

export const ProjectHeader = ({ icon: Icon, title, links }: ProjectHeaderProps) => {
	return (
		<header className='border-y bg-diagonal bg-[length:10px_10px]'>
			<div className='p-4 md:px-8 md:pb-6'>
				<div className='container mt-12 flex items-center gap-4'>
					<Icon size={30} />
					<h1 className='text-3xl font-medium md:text-4xl'>{title}</h1>
				</div>
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
	);
};
