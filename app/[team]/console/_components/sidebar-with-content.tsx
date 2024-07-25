'use client';

import { createContext, PropsWithChildren, useContext, useState } from 'react';
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
	open: true,
	toggle: () => {},
});

export const ToggleSidebarButton = () => {
	const { open, toggle } = useContext(SidebarContext);

	return (
		<Button className='flex w-full justify-start' variant='ghost' size='sm' onClick={toggle}>
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
	const [open, setOpen] = useState(true);

	const toggle = () => setOpen((open) => !open);

	return (
		<SidebarContext.Provider
			value={{
				open,
				toggle,
			}}
		>
			<div
				className={cn('z-10 hidden h-full bg-muted lg:fixed lg:block', {
					'w-[225px]': open,
					'w-16': !open,
				})}
			>
				{sidebar}
			</div>
			<div
				className={cn('h-full w-full', {
					'lg:ml-[225px]': open,
					'lg:ml-16': !open,
				})}
			>
				{children}
			</div>
		</SidebarContext.Provider>
	);
};
