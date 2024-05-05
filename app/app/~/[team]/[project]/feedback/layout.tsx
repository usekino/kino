import type { ProjectLayoutParams } from '../_lib/utils';

import { MessageSquare } from 'lucide-react';

import { ProjectHeader } from '../_components/project-header';

export default async function FeedbackLayout({ children }: ProjectLayoutParams) {
	return (
		<div>
			<ProjectHeader
				icon={MessageSquare}
				title='Feedback'
				links={[{ href: '/test	', title: 'Settings' }]}
			/>
			<>{children}</>
		</div>
	);
}
