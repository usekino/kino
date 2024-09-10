import { ConsoleHeader } from '../_components/console-header';
import { ProjectPageLoading } from '../_components/project-page-loading';
import { roadmapHeaderProps } from './_lib/roadmap-header-props';

const Loading = () => {
	return (
		<>
			<ConsoleHeader {...roadmapHeaderProps} />
			<div className='container pt-4'>
				<ProjectPageLoading />
			</div>
		</>
	);
};
export default Loading;
