import type { ProjectPageParams } from '../_lib/utils';

import { MessageSquare } from 'lucide-react';

import { ProjectWrapper } from '../_components/project-wrapper';
import { FeedbackTable } from './_components/feedback-table';

export default async function FeedbackPage({}: ProjectPageParams) {
	return (
		<div>
			<ProjectWrapper
				icon={MessageSquare}
				title='Feedback'
				links={[{ href: '/test	', title: 'Settings' }]}
			/>
			<FeedbackTable />
		</div>
	);
}
