import { notFound } from 'next/navigation';

import { api } from '@/lib/trpc/clients/server-invoker';
import { generateId } from '@/lib/utils';

export default async function TeamPage({ params }: { params: { team: string } }) {
	const team = await api.team.findBySlug({
		slug: String(params.team),
	});

	if (!team) {
		return notFound();
	}

	return (
		<div className='container py-6'>
			{generateId({
				prefix: 'U',
			})}
			<h1>Team Page for {team.name}</h1>
			<p>{team.description}</p>
		</div>
	);
}
