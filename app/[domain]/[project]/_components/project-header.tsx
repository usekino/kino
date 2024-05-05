import { LucideIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { API } from '@/lib/trpc/routers/_app';

import { ProjectLinks } from './project-header-nav';

type LinkData = {
	href: string;
	title: string;
};

export const ProjectHeader = ({
	project,
	title,
	icon: Icon,
}: {
	project: NonNullable<API['output']['project']['findBySlug']>;
	title: string;
	icon: LucideIcon;
}) => {
	return (
		<header className='border-b bg-accent/10 pt-8'>
			<div className='container'>
				<div className='flex items-center gap-3'>
					<Avatar className='h-8 w-8'>
						<AvatarImage alt='KI' />
						<AvatarFallback className='text-sm'>KI</AvatarFallback>
					</Avatar>
					<span className='text-lg'>{project.name}</span>
				</div>
			</div>
			<div className='p-4 md:px-8 md:pb-6'>
				<div className='container mt-12 flex items-center gap-4'>
					<Icon size={30} />
					<h1 className='text-3xl font-medium md:text-4xl'>{title}</h1>
				</div>
			</div>
			<div className='container pb-2'>
				<ProjectLinks />
			</div>
		</header>
	);
};
