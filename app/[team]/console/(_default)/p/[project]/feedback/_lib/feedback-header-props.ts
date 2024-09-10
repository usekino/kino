import { MessageSquare } from 'lucide-react';

export const feedbackHeaderProps = {
	icon: MessageSquare,
	title: 'Feedback',
	navProps: {
		consoleBasePathname: 'feedback',
		links: [
			{
				title: 'Viewer',
				href: ``,
			},
			{
				title: 'Boards',
				href: `/boards`,
			},
			{
				title: 'Settings',
				href: `/settings`,
			},
		],
	},
};
