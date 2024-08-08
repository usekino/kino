import { PropsWithChildren } from 'react';

import { TeamPageProps } from '@/app/[team]/_types';

export type PageProps = TeamPageProps & {
	params: {
		project: string;
	};
};

export type LayoutProps = PropsWithChildren<PageProps>;
