import { feedbackHeaderProps } from '../_lib/feedback-header-props';
import { ConsoleHeader } from '../../_components/console-header';
import { ProjectPageLoading } from '../../_components/project-page-loading';

const Loading = () => {
	return (
		<>
			<ConsoleHeader {...feedbackHeaderProps} />
			<div className='container pt-4'>
				<ProjectPageLoading />
			</div>
		</>
	);
};
export default Loading;
