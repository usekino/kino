import { ConsoleHeader } from '../_components/console-header';
import { ProjectPageLoading } from '../_components/project-page-loading';
import { roadmapHeaderProps } from './_lib/roadmap-header-props';

const Loading = () => {
	return (
		<div>
			<ConsoleHeader {...roadmapHeaderProps} />
			<div className='container pt-6'>
				<ProjectPageLoading />
			</div>
		</div>
	);
};
export default Loading;
