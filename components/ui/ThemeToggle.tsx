'use client';

import { useEffect } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getThemeCookie, setThemeCookie } from '@/lib/utils/theme-cookie';

export function ModeToggle() {
	const { setTheme } = useTheme();

	const handleThemeChange = async (theme: string) => {
		setThemeCookie(theme);
		setTheme(theme);
	};

	useEffect(() => {
		const setThemeFromCookie = async () => {
			const themeCookie = await getThemeCookie();
			if (themeCookie) {
				setTheme(themeCookie);
			}
		};
		setThemeFromCookie();
	}, [setTheme]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon'>
					<SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={() => handleThemeChange('light')}>Light</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleThemeChange('dark')}>Dark</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleThemeChange('system')}>System</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
