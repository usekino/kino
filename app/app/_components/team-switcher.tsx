'use client';

import React from 'react';
import { CheckIcon, ChevronsUpDown, ExternalLink, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { env } from '@/lib/env/client';
import { cn } from '@/lib/utils';
import { ReadTeamSchema } from '@/lib/validation/team-validation';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface TeamSwitcherProps extends PopoverTriggerProps {
	teams: ReadTeamSchema[];
}

export default function TeamSwitcher({ className, teams }: TeamSwitcherProps) {
	const router = useRouter();

	const [mounted, setMounted] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [selectedTeam, setSelectedTeam] = React.useState<ReadTeamSchema>(teams[0]);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};
		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	React.useEffect(() => {
		if (mounted) {
			localStorage.setItem('selectedTeam', JSON.stringify(selectedTeam.slug));
		}
	}, [selectedTeam]);

	React.useEffect(() => {
		setMounted(true);
	}, [mounted]);

	return (
		<div className='flex items-center gap-6'>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						role='combobox'
						aria-expanded={open}
						aria-label='Select a team'
						className={cn('w-[200px] justify-between', className)}
					>
						<Avatar className='mr-2 h-5 w-5'>
							{/* <AvatarImage
							src={`https://avatar.vercel.sh/${selectedTeam.slug}.png`}
							alt={selectedTeam.name}
							className='grayscale'
						/> */}
							<AvatarFallback>❖</AvatarFallback>
						</Avatar>
						{selectedTeam.name}
						<ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-[200px] p-0' asChild>
					<Command>
						<CommandInput placeholder='Search team...' />
						<CommandList>
							<CommandEmpty>No team found.</CommandEmpty>
							<CommandGroup key='owned-teams' heading='Teams'>
								{teams.map((team) => (
									<CommandItem
										key={team.slug}
										value={team.slug}
										onSelect={() => {
											setSelectedTeam(team);
											setOpen(false);
											router.push(`/team/${team.slug}`);
										}}
										className='text-sm'
									>
										<Avatar className='mr-2 h-5 w-5'>
											{/* <AvatarImage
												src={`https://avatar.vercel.sh/${team.slug}.png`}
												alt={team.name}
												className='grayscale'
											/> */}
											<AvatarFallback>❖</AvatarFallback>
										</Avatar>
										{team.name}
										<CheckIcon
											className={cn(
												'ml-auto h-4 w-4',
												selectedTeam.slug === team.slug ? 'opacity-100' : 'opacity-0'
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>

							<CommandSeparator />
							<CommandGroup>
								<CommandItem
									onSelect={() => {
										setOpen(false);
										router.push(`/create/team`);
									}}
								>
									<PlusCircle className='mr-2 h-5 w-5' />
									Create Team
								</CommandItem>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<a
				href={`https://${selectedTeam.slug}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`}
				className='inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary hover:underline'
			>
				Public view
				<ExternalLink size={16} />
			</a>
		</div>
	);
}
