import { deconstructTeamSlug } from '@/app/[team]/_lib/get-team';
import { api } from '@/lib/trpc/clients/server-invoker';

import { FeedbackTable } from '../_components/feedback-table';
import { feedbackHeaderProps } from '../_lib/feedback-header-props';
import { ConsoleHeader } from '../../_components/console-header';
import { PageProps } from '../../_types';

export default async function FeedbackPage({ params }: PageProps) {
	const { subdomain } = deconstructTeamSlug(params.team);
	subdomain;
	const { project: slug } = params;
	const feedback = await api.feedback.getByProject({ projectSlug: slug });
	return (
		<>
			<ConsoleHeader {...feedbackHeaderProps} breadcrumbs={['Viewer']} />
			<div className='container py-4'>
				<div className='w-full'>
					<div className='h-full overflow-scroll rounded-lg border bg-muted'>
						{feedback ? (
							<>
								<FeedbackTable feedback={feedback} />
							</>
						) : (
							<div>No feedback found</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
