import { ConsoleHeader } from '../_components/console-header';
import { ProjectSettings } from './_components/project-settings';
import { settingsHeaderProps } from './_lib/settings-header-props';

export default async function SettingsPage() {
	return (
		<div>
			<ConsoleHeader {...settingsHeaderProps} />
			<div className='container pt-6 xl:pt-6'>
				<div className='overflow-hidden rounded-md border bg-muted'>
					<ProjectSettings />
				</div>
			</div>
		</div>
	);
}
