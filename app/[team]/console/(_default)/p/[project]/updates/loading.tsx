import { ConsoleHeader } from '../_components/console-header';
import { ProjectPageLoading } from '../_components/project-page-loading';
import { updatesHeaderProps } from './_lib/updates-header-props';

const Loading = () => {
	return (
		<>
			<ConsoleHeader {...updatesHeaderProps} />
			<ProjectPageLoading />
		</>
	);
};
export default Loading;
