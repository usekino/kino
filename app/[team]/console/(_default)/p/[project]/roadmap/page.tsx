import { Heading } from '@/components/heading';

import { ConsoleHeader } from '../_components/console-header';
import { roadmapHeaderProps } from './_lib/roadmap-header-props';

export default async function RoadmapPage() {
	return (
		<div>
			<ConsoleHeader {...roadmapHeaderProps} />
			<div className='container pt-4'>
				<Heading tag='h1'>Roadmaps coming soon...</Heading>
			</div>
		</div>
	);
}
