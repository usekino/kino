'use client';

import { MapPin, MessageSquare, Rss, Settings } from 'lucide-react';

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { usePageSlugs } from '@/lib/utils/console.utils';
import { useLinks } from '@/lib/utils/use-links';

export function NavMain() {
	const { projectSlug } = usePageSlugs();

	const { links } = useLinks({
		base: `/console/p/kino`,
		links: [
			{
				title: 'Feedback',
				href: '/feedback',
				icon: MessageSquare,
			},
			{
				title: 'Updates',
				href: '/updates',
				icon: Rss,
			},
			{
				title: 'Roadmap',
				href: '/roadmap',
				icon: MapPin,
			},
			{
				title: 'Settings',
				href: '/settings',
				icon: Settings,
			},
		],
	});

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Features</SidebarGroupLabel>
			<SidebarMenu>
				{links.map((link) => {
					return (
						<SidebarMenuItem key={link.title}>
							<SidebarMenuButton asChild>
								<a
									href={link.href}
									className={cn({
										'bg-accent text-foreground hover:!bg-accent': link.active,
									})}
								>
									{link.icon && <link.icon />}
									<span>{link.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}
