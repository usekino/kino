import { LayoutProps } from '../_types';
import { RoadmapHeader } from './_components/roadmap-header';

export default async function RoadmapLayoutPage({ children }: LayoutProps) {
	return (
		<div>
			<RoadmapHeader />
			{children}
		</div>
	);
}
