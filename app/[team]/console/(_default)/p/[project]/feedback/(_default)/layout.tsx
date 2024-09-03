import { FeedbackHeader } from '../_components/feedback-header';

export default async function FeedbackLayoutPage({ children }: { children: React.ReactNode }) {
	return (
		<>
			<FeedbackHeader />
			{children}
		</>
	);
}
