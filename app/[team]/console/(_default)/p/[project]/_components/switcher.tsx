'use client';

import type { API } from '@/lib/trpc/routers/_app';

import { useContext, useState } from 'react';
import { CheckIcon, ChevronsUpDown, PlusCircle, UsersRound } from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { env } from '@/lib/env/client';
import { cn } from '@/lib/utils';
import { groupProjectsByTeam, MappedByProject } from '@/lib/utils/project.utils';

import { PageProps } from '../_types';
import { SidebarContext } from './sidebar-with-content';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;
type _Projects = NonNullable<API['output']['project']['getUserProjects']>;

interface ProjectSwitcherProps extends PopoverTriggerProps {
	projects: _Projects;
}

export default function Switcher({ projects, className }: ProjectSwitcherProps) {
	const pathname = usePathname();
	const params = useParams<PageProps['params']>();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const { open: sidebarOpen } = useContext(SidebarContext);

	const activeProject = projects.find((project) => project.slug === params.project);
	const projectsByTeam = groupProjectsByTeam(projects);

	const handleSelect = ({
		project,
		team,
	}: {
		project: Omit<MappedByProject, 'team'>;
		team: MappedByProject['team'];
	}) => {
		setOpen(false);

		const existingPath =
			pathname.split(`/console/p/${params.project}`)[1].replace(/^\/|\/$/g, '') ?? '';

		if (params.team !== team.slug) {
			router.push(
				`https://${team.slug}.${env.NEXT_PUBLIC_ROOT_DOMAIN}/console/p/${project.slug}/${existingPath}`
			);
		} else {
			router.push(`/console/p/${project.slug}/${existingPath}`);
		}
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
						size='sm'
						className={cn(
							'group relative w-full justify-between overflow-hidden text-xs',
							className
						)}
					>
						{/* TODO: Replace team name with avatar */}
						{activeProject ? (
							sidebarOpen ? (
								`${activeProject.team.name} / ${activeProject.name}`
							) : (
								activeProject.name.slice(0, 1).toUpperCase()
							)
						) : (
							<UsersRound size={12} className='text-muted-foreground' />
						)}
						<div className='absolute bottom-0 right-0 top-0 z-10 flex items-center bg-gradient-to-l from-native to-transparent pl-6 text-sm text-muted-foreground transition-colors group-hocus:from-accent group-hocus:to-transparent'>
							<ChevronsUpDown
								className={cn('ml-auto h-4 w-8 shrink-0 text-foreground', {
									hidden: !sidebarOpen,
								})}
							/>
						</div>
					</Button>
				</PopoverTrigger>
				<PopoverContent align='start' className='w-[200px] p-0' asChild>
					<Command>
						<CommandList>
							<CommandEmpty>No team found.</CommandEmpty>
							{projectsByTeam.map((team) => (
								<div key={team.id}>
									<CommandGroup heading={team.name}>
										{team.projects.map((project) => (
											<CommandItem
												key={project.slug}
												value={project.slug}
												onSelect={() => handleSelect({ project, team })}
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
