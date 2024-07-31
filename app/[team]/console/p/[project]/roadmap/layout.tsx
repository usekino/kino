import { LayoutParams } from '../_types';
import { RoadmapHeader } from './_components/roadmap-header';

export default async function RoadmapLayoutPage({ children }: LayoutParams) {
	return (
		<div>
			<RoadmapHeader />
			{children}
		</div>
	);
}
