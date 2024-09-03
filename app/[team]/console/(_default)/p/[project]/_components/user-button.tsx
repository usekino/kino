'use client';

import { useContext } from 'react';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { SidebarContext } from './sidebar-with-content';

export const UserButton = () => {
	const { open: sidebarOpen } = useContext(SidebarContext);

	return (
		<Link
			href='/console'
			className={cn(
				buttonVariants({
					variant: 'ghost',
					size: 'sm',
				}),
				'w-full justify-start gap-2'
			)}
		>
			<div
				className={cn(
					'mt-0.5 rounded-full border bg-gradient-to-tr from-native to-accent',
					sidebarOpen ? 'size-6' : 'size-4'
				)}
			></div>
			<span
				className={cn({
					hidden: !sidebarOpen,
				})}
			>
				@natedunn
			</span>
		</Link>
	);
};
