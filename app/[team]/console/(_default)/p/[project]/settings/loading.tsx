import { ConsoleHeader } from '../_components/console-header';
import { ProjectPageLoading } from '../_components/project-page-loading';
import { settingsHeaderProps } from './_lib/settings-header-props';

const Loading = () => {
	return (
		<>
			<ConsoleHeader {...settingsHeaderProps} />
			<div className='container pt-4'>
				<ProjectPageLoading />
			</div>
		</>
	);
};
export default Loading;
