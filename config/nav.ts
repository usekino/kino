import { Cog, HomeIcon } from 'lucide-react';

import { SidebarLink } from '@/components/SidebarItems';

type AdditionalLinks = {
	title: string;
	links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
	{ href: '/dashboard', title: 'Home', icon: HomeIcon },
	{ href: '/account', title: 'Account', icon: Cog },
	{ href: '/settings', title: 'Settings', icon: Cog },
];

export const additionalLinks: AdditionalLinks[] = [];
