import { Map } from 'lucide-react';

export const roadmapHeaderProps = {
	icon: Map,
	title: 'Roadmap',
	navProps: {
		consoleBasePathname: 'roadmap',
		links: [
			{
				title: 'Organizer',
				href: ``,
			},
			{
				title: 'Settings',
				href: `/settings`,
			},
		],
	},
};
