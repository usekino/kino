import type { LucideIcon } from 'lucide-react';

import { PropsWithChildren } from 'react';

import { Heading } from '@/components/heading';

// Props with children type

export const ProjectWrapper = ({
	icon: Icon,
	title,
	children,
}: PropsWithChildren<{ icon: LucideIcon; title: string }>) => {
	return (
		<div className='border-b'>
			<div className='flex items-center gap-4 px-8 pb-4 pt-12'>
				<Icon size={24} />
				<Heading tag='h1' variant='h2'>
					{title}
				</Heading>
			</div>

			{children}
		</div>
	);
};
