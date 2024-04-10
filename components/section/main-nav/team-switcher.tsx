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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
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
	const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
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

	return (
		<Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
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
				<PopoverContent className='relative z-10 w-[200px] p-0'>
					<Command>
						<CommandList>
							<CommandInput placeholder='Search team...' />
							<CommandEmpty>No team found.</CommandEmpty>
							{groups.map((group) => (
								<CommandGroup key={group.label} heading={group.label}>
									{group.teams.map((team) => (
										<CommandItem
											key={team.value}
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
						</CommandList>
						<CommandSeparator />
						<CommandList>
							<CommandGroup>
								<DialogTrigger asChild>
									<CommandItem
										onSelect={() => {
											setOpen(false);
											setShowNewTeamDialog(true);
										}}
									>
										<PlusCircle className='mr-2 h-5 w-5' />
										Create Team
									</CommandItem>
								</DialogTrigger>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create team</DialogTitle>
					<DialogDescription>Add a new team to manage products and customers.</DialogDescription>
				</DialogHeader>
				<div>
					<div className='space-y-4 py-2 pb-4'>
						<div className='space-y-2'>
							<Label htmlFor='name'>Team name</Label>
							<Input id='name' placeholder='Acme Inc.' />
						</div>
						<div className='space-y-2'>
							<Label htmlFor='plan'>Subscription plan</Label>
							<Select>
								<SelectTrigger>
									<SelectValue placeholder='Select a plan' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='free'>
										<span className='font-medium'>Free</span> -{' '}
										<span className='text-muted-foreground'>$0/month (during beta)</span>
									</SelectItem>
									<SelectItem value='pro' disabled>
										<span className='font-medium'>Pro</span> -{' '}
										<span className='text-muted-foreground'>$7/month</span>
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button variant='outline' onClick={() => setShowNewTeamDialog(false)}>
						Cancel
					</Button>
					<Button type='submit'>Continue</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
