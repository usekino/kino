'use client';

import type { TeamProjectSelect } from '@/lib/schema/dashboard.schema';
import type { ReadProjectSchema } from '@/lib/schema/project.schema';
import type { API } from '@/lib/trpc/routers/_app';

import { useEffect, useState } from 'react';
import { CheckIcon, ChevronsUpDown, PlusCircle } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';

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
import { cn } from '@/lib/utils';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;
type _Projects = API['output']['dashboard']['userProjects']['projects'];

interface ProjectSwitcherProps extends PopoverTriggerProps {
	projectsByTeam: _Projects;
	selected: TeamProjectSelect;
}

export default function Switcher({ className, projectsByTeam, selected }: ProjectSwitcherProps) {
	const projects = projectsByTeam.map((team) => team.projects).flat();

	const pathname = usePathname();
	const params = useParams();
	const router = useRouter();

	const paramSelectedProject = projects.find((project) => project.slug === params.project);

	const [open, setOpen] = useState(false);
	const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | undefined>(
		paramSelectedProject
	);

	useEffect(() => {
		if (!params.project) {
			const redisSelectedProject = projects.find(
				(project) => project.slug === selected.project?.slug
			);
			setSelectedProject(redisSelectedProject);
		} else {
			setSelectedProject(paramSelectedProject);
		}
	}, [params.project, selected]);

	// const { data: project } = api.project.findBySlug.useQuery({
	// 	slug: String(params.project),
	// });

	// useEffect(() => {
	// 	if (mounted) {
	// 		localStorage.setItem('selectedTeam', JSON.stringify(params.project));
	// 	}
	// }, [params.project, mounted]);

	// useEffect(() => {
	// 	setMounted(true);
	// }, [mounted]);

	const handleSelect = (project: ReadProjectSchema) => {
		setOpen(false);

		if (!project) {
			return router.push(`/console`);
		}

		const existingPath =
			pathname.split(`/console/p/${params.project}`)[1].replace(/^\/|\/$/g, '') ?? '';
		const url = `/console/p/${project.slug}/${existingPath}`;

		router.push(url);
	};

	return (
		<div>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						role='combobox'
						aria-expanded={open}
						aria-label='Select a team'
						className={cn('w-[150px] justify-between', className)}
					>
						{selectedProject?.name ?? 'Loading...'}
						<ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
					</Button>
				</PopoverTrigger>
				<PopoverContent align='start' className='w-[200px] p-0' asChild>
					<Command>
						<CommandInput placeholder={`Search project${projects.length > 1 ? 's' : ''}...`} />
						<CommandList>
							<CommandEmpty>No team found.</CommandEmpty>
							{projectsByTeam.map((team) => (
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
							))}

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
		</div>
	);
}
