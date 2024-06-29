'use client';

import { AlertCircle, Home, Map, MessageSquare, Rss } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import { API } from '@/lib/trpc/routers/_app';
import { cn } from '@/lib/utils';
import { useLinks } from '@/lib/utils/use-links';

type Project = NonNullable<API['output']['project']['findBySlug']>;

export const ProjectHeader = ({ project }: { project: Project }) => {
	const { slug } = project;

	const teamInitial = project.team.name.slice(0, 1)[0].toUpperCase();

	const { links, current, isActive } = useLinks({
		base: `/p/${slug}`,
		links: [
			{
				href: ``,
				title: 'Dashboard',
				icon: Home,
				className: '',
			},
			{
				href: `/feedback`,
				title: 'Feedback',
				icon: MessageSquare,
				className: '',
			},
			{
				href: `/updates`,
				title: 'Updates',
				icon: Rss,
				className: '',
			},
			{
				href: `/roadmap`,
				title: 'Roadmap',
				icon: Map,
				className: '',
			},
		],
	});

	const IconElement = current?.icon ?? AlertCircle;

	if (!current) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<div className='border-b bg-background py-3'>
				<div className='container flex items-center gap-4 text-sm'>
					<div className='flex items-center gap-2'>
						<Avatar className='h-7 w-7 border'>
							<AvatarImage alt={teamInitial} />
							<AvatarFallback className='bg-native-foreground/10 text-[10px]'>
								{teamInitial}
							</AvatarFallback>
						</Avatar>
						<Link className='decoration-1 underline-offset-2 hocus:underline' href='/'>
							{project.team.name}
						</Link>
						<span className='opacity-50'>/</span>
						<Link
							className='decoration-1 underline-offset-2 hocus:underline'
							href={`/p/${project.team.slug}/${project.slug}`}
						>
							{project.name}
						</Link>
					</div>
					<div className='inline-block rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground/75'>
						<span className='opacity-50'>powered by </span>
						<span className='font-bold tracking-widest'>KINO</span>
					</div>
				</div>
			</div>
			<header className='space-y-2 border-b bg-muted pb-3 pt-10'>
				<div className='container'>
					<div className='mx-2 flex items-center gap-3'>
						<IconElement size={20} />
						<h1 className='text-2xl font-medium md:text-3xl'>{current?.title}</h1>
					</div>
				</div>
				<div className='container'>
					<nav className={cn('inline-flex items-center gap-2')}>
						{links.map((link) => {
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
											: '',
										link.className
									)}
								>
									<span className='inline-flex items-center gap-2 text-sm'>
										<link.icon size={12} />
										{link.title}
									</span>
								</Link>
							);
						})}
					</nav>
				</div>
			</header>
		</div>
	);
};
