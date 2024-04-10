export default async function FeedbackPage({
	params,
}: {
	params: {
		domain: string;
	};
}) {
	console.log('params', params);
	return (
		<div>
			<h1>Feedback for {params.domain}</h1>
			<p>Feedback form coming soon...</p>
		</div>
	);
}
