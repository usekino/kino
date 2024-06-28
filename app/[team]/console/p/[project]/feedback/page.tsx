import { MessageSquare } from 'lucide-react';

import { ProjectWrapper } from '../_components/project-wrapper';
import { PageParams } from '../_types';
import { FeedbackTable } from './_components/feedback-table';

export default async function FeedbackPage({ params }: PageParams) {
	const base = `/console/p/${params.project}/feedback`;
	return (
		<>
			<ProjectWrapper
				icon={MessageSquare}
				title='Feedback'
				links={[
					{ href: `${base}`, title: 'All feedback' },
					{
						href: `${base}/boards`,
						title: 'Boards',
					},
					{
						href: `${base}/settings`,
						title: 'Settings',
					},
				]}
			/>
			<div className='p-2 sm:p-4 md:p-6'>
				<div className='overflow-hidden rounded-lg border bg-muted'>
					<FeedbackTable />
				</div>
			</div>
		</>
	);
}
