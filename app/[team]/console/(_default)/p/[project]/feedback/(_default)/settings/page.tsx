import { feedbackHeaderProps } from '../../_lib/feedback-header-props';
import { ConsoleHeader } from '../../../_components/console-header';

export default async function FeedbackSettingsPage() {
	return (
		<>
			<ConsoleHeader {...feedbackHeaderProps} breadcrumbs={['Settings']} />
			<h1 className='mb-4 text-3xl font-semibold'>Feedback Settings</h1>
		</>
	);
}
