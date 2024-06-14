import type { User } from 'lucia';

import { CircleUserRound, LogOut, SquareTerminal } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getInitials } from '@/lib/utils';
import { serverRoute } from '@/lib/utils/server-route';

export async function UserNav({ user }: { user: User }) {
	const { createRoute: route } = await serverRoute({
		teamSlug: user.username,
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='relative flex items-center gap-2 px-2'>
					<Avatar className='h-6 w-6 rounded-full border'>
						{/* <AvatarImage src='/avatars/01.png' alt='@shadcn' /> */}
						<AvatarFallback className='text-[10px]'>
							{getInitials(user?.name ?? user.username)}
						</AvatarFallback>
					</Avatar>
					@{user.username}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-medium leading-none'>@{user.username}</p>
						<p className='text-xs leading-none text-muted-foreground'>{user.email}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href={route(`/`)}>
						<CircleUserRound
							size={16}
							className='opacity-50 transition-all duration-200 ease-in-out group-hocus:opacity-100'
						/>
						Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href={route(`/`, { console: true })}>
						<SquareTerminal
							size={16}
							className='opacity-50 transition-all duration-200 ease-in-out group-hocus:opacity-100'
						/>
						Console
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href='/api/sign-out'>
						<LogOut
							size={16}
							className='opacity-50 transition-all duration-200 ease-in-out group-hocus:opacity-100'
						/>
						Log out
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
