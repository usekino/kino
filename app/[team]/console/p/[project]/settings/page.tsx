import { ProjectSettings } from './_components/project-settings';
import { SettingsHeader } from './_components/settings-header';

export default async function SettingsPage() {
	return (
		<div>
			<SettingsHeader />
			<ProjectSettings />
		</div>
	);
}
