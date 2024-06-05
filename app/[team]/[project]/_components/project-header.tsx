import type { API } from '@/lib/trpc/routers/_app';
import type { LucideIcon } from 'lucide-react';

import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { serverRoute } from '../../../../lib/utils/server-route';
import { ProjectLinks } from './project-header-nav';

export const ProjectHeader = async ({
	project,
	title,
	icon: Icon,
}: {
	project: NonNullable<API['output']['project']['findBySlug']>;
	title: string;
	icon: LucideIcon;
}) => {
	const teamInitial = project.team.name.slice(0, 1)[0].toUpperCase();
	const route = await serverRoute({
		teamSlug: project.team.slug,
	});

	return (
		<header className='border-b bg-muted pb-3'>
			<div className='border-b bg-background py-3'>
				<div className='container flex items-center gap-2 text-sm'>
					<Avatar className='h-6 w-6 border'>
						<AvatarImage
							alt={teamInitial}
							// src={project.team.avatar}
							src='https://pbs.twimg.com/profile_images/1658990770299232260/lqSKQU6d_400x400.jpg'
						/>
						<AvatarFallback className='text-[10px]'>{teamInitial}</AvatarFallback>
					</Avatar>
					<Link className='decoration-1 underline-offset-2 hocus:underline' href={route(`/`)}>
						@{project.team.slug}
					</Link>
					<span className='opacity-50'> / </span>
					<Link
						className='decoration-1 underline-offset-2 hocus:underline'
						href={route(`/${project.slug}`)}
					>
						{project.slug}
					</Link>
				</div>
			</div>
			<div className='container mt-10'>
				<div className='mx-2 my-4 flex items-center gap-3'>
					<Icon size={20} />
					<h1 className='text-2xl font-medium md:text-3xl'>{title}</h1>
				</div>
			</div>
			<div className='container'>
				<ProjectLinks />
			</div>
		</header>
	);
};
