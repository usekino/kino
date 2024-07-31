import type { PageProps } from '../_types';

import { Heading } from '@/components/heading';

export default async function ProjectPage({}: PageProps) {
	return (
		<div className='container py-6'>
			<Heading tag='h1'>Project dashboard</Heading>
		</div>
	);
}
