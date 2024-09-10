import type { PageProps } from '../_types';

import { Heading } from '@/components/heading';

import { ConsoleHeader } from '../_components/console-header';
import { dashboardHeaderProps } from './_lib/dashboard-header-props';

export default async function ProjectPage({}: PageProps) {
	return (
		<>
			<ConsoleHeader {...dashboardHeaderProps} />
			<div className='container pt-4'>
				<Heading tag='h1'>Dashboard</Heading>
			</div>
		</>
	);
}
