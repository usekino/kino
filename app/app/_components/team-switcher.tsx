'use client';

import React from 'react';
import { CheckIcon, ChevronsUpDown, PlusCircle } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

const groups = [
	{
		label: 'Teams',
		teams: [
			{
				label: 'Acme Inc.',
				value: 'acme-inc',
			},
			{
				label: 'Monsters Inc.',
				value: 'monsters',
			},
		],
	},
];

type Team = (typeof groups)[number]['teams'][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
	const [open, setOpen] = React.useState(false);
	const [selectedTeam, setSelectedTeam] = React.useState<Team>(groups[0].teams[0]);

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

	React.useEffect(() => {}, [selectedTeam]);

	return (
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
						<AvatarImage
							src={`https://avatar.vercel.sh/${selectedTeam.value}.png`}
							alt={selectedTeam.label}
							className='grayscale'
						/>
						<AvatarFallback>SC</AvatarFallback>
					</Avatar>
					{selectedTeam.label}
					<ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0' asChild>
				<Command>
					<CommandInput placeholder='Search team...' />
					<CommandList>
						<CommandEmpty>No team found.</CommandEmpty>
						{groups.map((group) => (
							<CommandGroup key={group.label} heading={group.label}>
								{group.teams.map((team) => (
									<CommandItem
										key={team.value}
										value={team.value}
										onSelect={() => {
											setSelectedTeam(team);
											setOpen(false);
										}}
										className='text-sm'
									>
										<Avatar className='mr-2 h-5 w-5'>
											<AvatarImage
												src={`https://avatar.vercel.sh/${team.value}.png`}
												alt={team.label}
												className='grayscale'
											/>
											<AvatarFallback>SC</AvatarFallback>
										</Avatar>
										{team.label}
										<CheckIcon
											className={cn(
												'ml-auto h-4 w-4',
												selectedTeam.value === team.value ? 'opacity-100' : 'opacity-0'
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						))}
						<CommandSeparator />
						<CommandGroup>
							<CommandItem
								onSelect={() => {
									console.log('Go to create team page');
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
	);
}
