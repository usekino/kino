import type { ProjectPageParams } from '../_lib/utils';

import { MessageSquare } from 'lucide-react';

import { ProjectWrapper } from '../_components/project-wrapper';
import { FeedbackTable } from './_components/feedback-table';

export default async function FeedbackPage({}: ProjectPageParams) {
	return (
		<ProjectWrapper
			icon={MessageSquare}
			title='Feedback'
			links={[{ href: '/test	', title: 'Settings' }]}
		>
			<div className='container py-6'>
				<FeedbackTable />
			</div>
		</ProjectWrapper>
	);
}
