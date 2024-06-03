import type { API } from '@/lib/trpc/routers/_app';
import type { LucideIcon } from 'lucide-react';

import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { ProjectLinks } from './project-header-nav';

export const ProjectHeader = ({
	project,
	title,
	icon: Icon,
}: {
	project: NonNullable<API['output']['project']['findBySlug']>;
	title: string;
	icon: LucideIcon;
}) => {
	const teamInitial = project.team.name.slice(0, 1)[0].toUpperCase();
	return (
		<header className='border-b bg-white pt-8 dark:bg-accent/10'>
			<div className='container'>
				<div className='mx-2 flex items-center gap-3'>
					<Avatar className='h-6 w-6'>
						<AvatarImage alt={teamInitial} />
						<AvatarFallback className='text-[10px]'>{teamInitial}</AvatarFallback>
					</Avatar>
					<Link
						className='decoration-2 underline-offset-2 hocus:underline'
						href={`https://${project.team.slug}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/`}
					>
						{project.team.name}
					</Link>
					<span className='opacity-50'> / </span>
					<Link
						className='decoration-2 underline-offset-2 hocus:underline'
						href={`https://${project.team.slug}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/project/${project.slug}/`}
					>
						{project.slug}
					</Link>
				</div>
			</div>
			<div className='container'>
				<div className='mx-2 mt-12 flex items-center gap-4'>
					<Icon size={30} />
					<h1 className='text-3xl font-medium md:text-4xl'>{title}</h1>
				</div>
			</div>
			<div className='container pb-2 pt-6'>
				<ProjectLinks />
			</div>
		</header>
	);
};
