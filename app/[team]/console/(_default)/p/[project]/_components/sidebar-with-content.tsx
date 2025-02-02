'use client';

import type { PropsWithChildren } from 'react';

import { createContext, useContext, useState } from 'react';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type MainLayoutProps = PropsWithChildren<{
	sidebar: React.ReactNode;
}>;

export const SidebarContext = createContext<{
	open: boolean;
	toggle: () => void;
}>({
	open: false,
	toggle: () => {},
});

export const ToggleSidebarButton = ({ className }: { className?: string }) => {
	const { open, toggle } = useContext(SidebarContext);

	return (
		<Button className={className} variant='ghost' size='sm' onClick={toggle}>
			{open ? (
				<span className='flex items-center gap-2'>
					<ArrowLeftFromLine size={16} />
					<span>Close sidebar</span>
				</span>
			) : (
				<ArrowRightFromLine size={16} />
			)}
		</Button>
	);
};

export const SidebarWithContent = ({ children, sidebar }: MainLayoutProps) => {
	const [open, setOpen] = useState(false);

	const toggle = () => setOpen((open) => !open);

	return (
		<SidebarContext.Provider
			value={{
				open,
				toggle,
			}}
		>
			<div
				className={cn('z-20 hidden h-full bg-muted lg:fixed lg:block', {
					'w-[225px]': open,
					'w-16': !open,
				})}
			>
				{sidebar}
			</div>
			<div
				className={cn('flex h-full w-full flex-col', {
					'lg:ml-[225px]': open,
					'lg:ml-16': !open,
				})}
			>
				{children}
			</div>
		</SidebarContext.Provider>
	);
};
