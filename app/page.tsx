import Link from 'next/link';

import { api } from '@/lib/trpc/clients/server-invoker';

import { ClientTest } from './client-test';

export default async function LandingPage() {
	// const test = await api.computers.getComputers();
	return (
		<div>
			HOME
			<div>
				<ClientTest />
				{/* {test ? (
					<div>
						<h2>Profile</h2>
						<pre>{JSON.stringify(test, null, 2)}</pre>
					</div>
				) : (
					<Link href='/sign-in'>Sign in</Link>
				)} */}
			</div>
		</div>
	);
}
