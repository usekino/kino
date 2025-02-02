import { Heading } from '@/components/heading';

import { ConsoleHeader } from '../_components/console-header';
import { dashboardHeaderProps } from './_lib/dashboard-header-props';

export default async function ProjectPage() {
	return (
		<div>
			<ConsoleHeader {...dashboardHeaderProps} />
			<div className='container pt-6'>
				<Heading tag='h1'>Dashboard</Heading>
			</div>
		</div>
	);
}
