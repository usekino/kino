import { feedbackHeaderProps } from '../../_lib/feedback-header-props';
import { ConsoleHeader } from '../../../_components/console-header';

export default async function FeedbackBoardsPage() {
	return (
		<div>
			<ConsoleHeader {...feedbackHeaderProps} breadcrumbs={['Boards']} />
			<h1 className='mb-4 text-3xl font-semibold'>Feedback Boards</h1>
		</div>
	);
}
