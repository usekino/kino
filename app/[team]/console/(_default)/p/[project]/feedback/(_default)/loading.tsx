import { feedbackHeaderProps } from '../_lib/feedback-header-props';
import { ConsoleHeader } from '../../_components/console-header';
import { ProjectPageLoading } from '../../_components/project-page-loading';

const Loading = () => {
	return (
		<div>
			<ConsoleHeader {...feedbackHeaderProps} />
			<div className='container pt-6'>
				<ProjectPageLoading />
			</div>
		</div>
	);
};
export default Loading;
