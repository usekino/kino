import { MessageSquare } from 'lucide-react';

import { ProjectWrapper } from '../../_components/project-wrapper';
import { FeedbackNav } from './feedback-nav';

export const FeedbackHeader = () => {
	return (
		<header>
			<ProjectWrapper icon={MessageSquare} title='Feedback'>
				<FeedbackNav />
			</ProjectWrapper>
		</header>
	);
};
