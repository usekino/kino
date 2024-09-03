import { Heading } from '@/components/heading';

export default async function RoadmapPage() {
	await new Promise((resolve) => setTimeout(resolve, 6000));

	return (
		<div className='p-2 sm:p-4 md:p-6'>
			<Heading tag='h1'>Coming soon...</Heading>
		</div>
	);
}
