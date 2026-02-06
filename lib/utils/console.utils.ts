import { useParams } from 'next/navigation';

export const usePageSlugs = (
	{
		require,
	}: {
		require: {
			projectSlug: boolean;
			teamSlug: boolean;
		};
	} = {
		require: {
			projectSlug: true,
			teamSlug: true,
		},
	}
) => {
	const params = useParams();

	const projectSlug = params.project as string | undefined;
	const teamSlug = params.team as string | undefined;

	if (require.projectSlug && !projectSlug) {
		throw new Error('Project slug is required');
	}

	if (require.teamSlug && !teamSlug) {
		throw new Error('Team slug is required');
	}

	return {
		teamSlug,
		projectSlug,
	};
};
