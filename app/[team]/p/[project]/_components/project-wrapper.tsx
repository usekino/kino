import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { API } from '@/lib/trpc/routers/_app';

import { ProjectLinks } from './project-header-nav';

type Project = NonNullable<API['output']['project']['findBySlug']>;

export const ProjectWrapper = ({
	children,
	project,
	title,
	icon: Icon,
}: {
	children: React.ReactNode;
	project: Project;
	title: string;
	icon: LucideIcon;
}) => {
	const teamInitial = project.team.name.slice(0, 1)[0].toUpperCase();

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
							href={`/~/${project.team.slug}/${project.slug}`}
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
						<Icon size={20} />
						<h1 className='text-2xl font-medium md:text-3xl'>{title}</h1>
					</div>
				</div>
				<div className='container'>
					<ProjectLinks projectSlug={project.slug} />
				</div>
			</header>
			<>{children}</>
		</div>
	);
};
