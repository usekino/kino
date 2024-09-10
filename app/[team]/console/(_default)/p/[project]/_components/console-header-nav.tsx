'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LinkData, useLinks } from '@/lib/utils/use-links';

export type ConsoleHeaderNavProps = {
	consoleBasePathname: string;
	links: LinkData[];
};

export const ConsoleHeaderNav = ({ consoleBasePathname, links: _links }: ConsoleHeaderNavProps) => {
	const params = useParams();

	const { links } = useLinks({
		base: `/console/p/${params.project}/${consoleBasePathname}`,
		links: _links,
	});

	return (
		<div className='flex items-stretch'>
			<nav className='inline-flex items-center gap-2 pb-4'>
				{links?.map((link) => {
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
								link.active
									? 'bg-accent text-accent-foreground hover:!bg-accent hover:!text-accent-foreground focus:!bg-accent focus:!text-accent-foreground'
									: 'bg-accent/30'
							)}
						>
							<span className='inline-flex items-center gap-2 text-sm'>{link.title}</span>
						</Link>
					);
				})}
			</nav>
		</div>
	);
};
