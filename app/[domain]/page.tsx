import { getSession } from '@/lib/auth/utils';

export default async function DomainPage() {
	const session = await getSession();

	return (
		<div>
			{session ? (
				<div>
					<h2>Profile</h2>
					<pre>{JSON.stringify(session, null, 2)}</pre>
				</div>
			) : (
				'Sign In'
			)}
		</div>
	);
}
