import { Rss } from 'lucide-react';

import { ProjectWrapper } from '../_components/project-wrapper';
import { UpdatesTable } from './_components/updates-table';

export default async function UpdatesPage() {
	const links = [
		{
			title: 'Settings',
			href: '#',
		},
	];

	return (
		<div>
			<ProjectWrapper icon={Rss} title='Updates' links={links} />
			<div className='container py-6'>
				<UpdatesTable />
			</div>
		</div>
	);
}
