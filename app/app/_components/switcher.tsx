'use client';

import type { API } from '@/lib/trpc/routers/_app';
import type { TeamProjectSelect } from '@/lib/validation/dashboard-validation';
import type { ReadProjectSchema } from '@/lib/validation/project-validation';
import type { ReadTeamSchema } from '@/lib/validation/team-validation';

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
import { api } from '@/lib/trpc/clients/client';
import { cn } from '@/lib/utils';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;
type _Projects = API['output']['dashboard']['projectsByTeam'];

interface ProjectSwitcherProps extends PopoverTriggerProps {
	projectsByTeam: _Projects;
	selected: TeamProjectSelect;
}

export default function Switcher({ className, projectsByTeam }: ProjectSwitcherProps) {
	const projects = projectsByTeam.map((team) => team.projects).flat();

	const pathname = usePathname();
	const params = useParams();
	const router = useRouter();

	const [mounted, setMounted] = useState(false);
	const [open, setOpen] = useState(false);

	const { data: project } = api.project.findBySlug.useQuery({
		slug: String(params.project),
	});

	useEffect(() => {
		if (mounted) {
			localStorage.setItem('selectedTeam', JSON.stringify(params.project));
		}
	}, [params.project, mounted]);

	useEffect(() => {
		setMounted(true);
	}, [mounted]);

	const handleSelect = (project: ReadProjectSchema, team: ReadTeamSchema) => {
		setOpen(false);

		if (!project) {
			return router.push(`/t/${team.slug}`);
		}

		const existingPath =
			pathname.split(`/~/${params.team}/${params.project}`)[1].replace(/^\/|\/$/g, '') ?? '';
		const url = `/~/${team.slug}/${project.slug}/${existingPath}`;

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
						className={cn('w-[200px] justify-between', className)}
					>
						{project?.name ?? 'Loading...'}
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
