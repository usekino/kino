'use client';

import { api } from '@/lib/trpc/clients/client';

export const ClientTest = () => {
	const { data: test } = api.computers.getComputers.useQuery();

	console.log('test', test);
	return (
		<div>
			{test ? (
				<div>
					<h2>Profile</h2>
					<pre>{JSON.stringify(test, null, 2)}</pre>
				</div>
			) : (
				<div>Nothing found.</div>
			)}
		</div>
	);
};
