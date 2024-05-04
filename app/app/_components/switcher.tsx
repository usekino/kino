'use client';

import type { API } from '@/lib/trpc/routers/_app';
import type { TeamProjectSelect } from '@/lib/validation/dashboard-validation';
import type { ReadProjectSchema } from '@/lib/validation/project-validation';

import { useEffect, useState } from 'react';
import { CheckIcon, ChevronsUpDown, PlusCircle } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

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
import { api } from '@/lib/trpc/clients/client';
import { cn } from '@/lib/utils';
import { ReadTeamSchema } from '@/lib/validation/team-validation';

import { splitPathAfterProject } from '../_lib/splitPathAfterProject';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;
type _Projects = API['output']['dashboard']['projectsByTeam'];

interface ProjectSwitcherProps extends PopoverTriggerProps {
	projectsByTeam: _Projects;
	selected: TeamProjectSelect;
}

export default function Switcher({ className, projectsByTeam, selected }: ProjectSwitcherProps) {
	const projects = projectsByTeam.map((team) => team.projects).flat();

	const pathname = usePathname();
	const router = useRouter();

	const { mutate: switchProject } = api.project.switch.useMutation({
		onSuccess: () => {},
		onError: (error) => {
			console.log(error);
		},
	});

	const [mounted, setMounted] = useState(false);
	const [open, setOpen] = useState(false);

	const [selectedProject, setSelectedProject] = useState<ReadProjectSchema>(
		projects.find((project) => project.slug === selected.project?.slug) ??
			projectsByTeam[0].projects[0]
	);

	// useEffect(() => {
	// 	const down = (e: KeyboardEvent) => {
	// 		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
	// 			e.preventDefault();
	// 			setOpen((open) => !open);
	// 		}
	// 	};
	// 	document.addEventListener('keydown', down);
	// 	return () => document.removeEventListener('keydown', down);
	// }, []);

	useEffect(() => {
		if (mounted) {
			localStorage.setItem('selectedTeam', JSON.stringify(selectedProject.slug));
		}
	}, [selectedProject]);

	useEffect(() => {
		setMounted(true);
	}, [mounted]);

	const handleSelect = (project: ReadProjectSchema, team: ReadTeamSchema) => {
		setSelectedProject(project);
		setOpen(false);
		switchProject({
			team: {
				id: team.id,
				slug: team.slug,
			},
			project: {
				slug: project.slug,
				id: project.id,
			},
		});

		if (!project) {
			return router.push(`/t/${team.slug}`);
		}

		const path = splitPathAfterProject(pathname);
		router.push(`/t/${team.slug}/p/${project.slug}/${path}`);
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
						className={cn('w-[200px] justify-between', className)}
					>
						{selectedProject.name}
						<ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-[200px] p-0' asChild>
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
												onSelect={() => handleSelect(project, team)}
												className='text-sm'
											>
												{project.name}
												<CheckIcon
													className={cn(
														'ml-auto h-4 w-4',
														selectedProject.slug === project.slug ? 'opacity-100' : 'opacity-0'
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
