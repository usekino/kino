'use client';

import type { DashboardSchema } from '@/lib/schema/dashboard.schema';
import type { API } from '@/lib/trpc/routers/_app';

import { useContext, useEffect, useState } from 'react';
import { ClassValue } from 'clsx';
import { User } from 'lucia';
import { CheckIcon, ChevronsUpDown, PlusCircle } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ProjectsSchema } from '@/lib/schema/projects/projects.schema';
import { api } from '@/lib/trpc/clients/client';
import { cn } from '@/lib/utils';
import { groupProjectsByTeam } from '@/lib/utils/project.utils';

import { SidebarContext } from './sidebar-with-content';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;
type _Projects = NonNullable<API['output']['project']['getUserProjects']>;

interface ProjectSwitcherProps extends PopoverTriggerProps {
	projects: _Projects;
}

export default function Switcher({ projects, className }: ProjectSwitcherProps) {
	// const projects = projectsByTeam.flatMap(({ projects, slug }) =>
	// 	projects.map((project) => ({
	// 		...project,
	// 		teamSlug: slug,
	// 	}))
	// );

	const pathname = usePathname();
	const params = useParams();
	const router = useRouter();

	// const paramSelectedProject = projects.find((project) => project.slug === params.project);

	const [open, setOpen] = useState(false);
	// const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | undefined>(
	// 	paramSelectedProject
	// );

	// const { mutate: updateSelectedProject } = api.dashboard.updateSelectedProject.useMutation({
	// 	onError: (error) => {
	// 		toast.error('Error', { description: error.message });
	// 	},
	// });

	const { open: sidebarOpen } = useContext(SidebarContext);

	const projectByTeam = groupProjectsByTeam(projects);

	// useEffect(() => {
	// 	if (!params.project) {
	// 		const redisSelectedProject = projects.find((project) => project.slug === selected?.slug);
	// 		setSelectedProject(redisSelectedProject);
	// 	} else {
	// 		setSelectedProject(paramSelectedProject);
	// 	}
	// }, [params.project, selected]);

	const handleSelect = (project: ProjectsSchema['Read']) => {
		setOpen(false);

		if (!project) {
			return router.push(`/console`);
		}

		// updateSelectedProject({
		// 	userId: user.id,
		// 	id: project.id,
		// 	slug: project.slug,
		// });

		const existingPath =
			pathname.split(`/console/p/${params.project}`)[1].replace(/^\/|\/$/g, '') ?? '';
		const url = `/console/p/${project.slug}/${existingPath}`;

		router.push(url);
	};

	return (
		<>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						role='combobox'
						aria-expanded={open}
						aria-label='Select a team'
						// size={!sidebarOpen ? 'sm' : 'default'}
						size='sm'
						className={cn('w-full justify-between', className)}
					>
						{/* {defaultProject
							? sidebarOpen
								? `@${defaultProject?.name}/${selectedProject.slug}`
								: selectedProject.slug.slice(0, 1).toUpperCase()
							: 'Loading...'} */}
						<ChevronsUpDown
							className={cn('ml-auto h-4 w-4 shrink-0 opacity-50', {
								hidden: !sidebarOpen,
							})}
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent align='start' className='w-[200px] p-0' asChild>
					<Command>
						{/* <CommandInput placeholder={`Search project${projects.length > 1 ? 's' : ''}...`} /> */}
						<CommandList>
							<CommandEmpty>No team found.</CommandEmpty>
							{/* {projectsByTeam.map((team) => (
								<div key={team.id}>
									<CommandGroup heading={team.name}>
										{team.projects.map((project) => (
											<CommandItem
												key={project.slug}
												value={project.slug}
												onSelect={() => handleSelect(project)}
												className='text-sm'
											>
												{project.name}
												<CheckIcon
													className={cn(
														'ml-auto h-4 w-4',
														project.slug === params.project ? 'opacity-100' : 'opacity-0'
													)}
												/>
											</CommandItem>
										))}
									</CommandGroup>
									<CommandSeparator />
								</div>
							))} */}

							<CommandSeparator />
							<CommandGroup>
								<CommandItem
									onSelect={() => {
										setOpen(false);
										router.push(`/create/project`);
									}}
								>
									<PlusCircle className='mr-2 h-5 w-5' />
									Create Project
								</CommandItem>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</>
	);
}
