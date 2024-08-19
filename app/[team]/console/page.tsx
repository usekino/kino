// import { redirect } from 'next/navigation';

import { redirect } from 'next/navigation';

import { Heading } from '@/components/heading';
import { api } from '@/lib/trpc/clients/server-invoker';

// import { getUser } from '@/lib/auth/utils';
// import { env } from '@/lib/env/server';

// import { api } from '@/lib/trpc/clients/server-invoker';

export default async function ConsolePage() {
	const selected = await api.dashboard.selected();

	if (!selected) {
		return redirect(`/create/project`);
	}

	if (selected.slug) {
		return redirect(`/console/p/${selected.slug}`);
	}

	return (
		<div className='p-2 sm:p-4 md:p-6'>
			<Heading tag='h1'>Redirecting...</Heading>
		</div>
	);
}
