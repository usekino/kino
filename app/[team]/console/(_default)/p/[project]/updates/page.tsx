import { Heading } from '@/components/heading';

import { ConsoleHeader } from '../_components/console-header';
import { updatesHeaderProps } from './_lib/updates-header-props';

export default async function UpdatesPage() {
	return (
		<div>
			<ConsoleHeader {...updatesHeaderProps} />
			<div className='container pt-6'>
				<Heading tag='h1'>Updates coming soon...</Heading>
			</div>
		</div>
	);
}
