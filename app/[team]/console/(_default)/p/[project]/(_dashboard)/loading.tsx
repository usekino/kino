import { ConsoleHeader } from '../_components/console-header';
import { ProjectPageLoading } from '../_components/project-page-loading';
import { dashboardHeaderProps } from './_lib/dashboard-header-props';

const Loading = () => {
	return (
		<>
			<ConsoleHeader {...dashboardHeaderProps} />
			<div className='container pt-4'>
				<ProjectPageLoading />
			</div>
		</>
	);
};
export default Loading;
