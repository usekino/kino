import { TeamPageProps } from '@/app/[team]/_types';

export type PageProps = TeamPageProps & {
	params: {
		project: string;
	};
};
