import type { PropsWithChildren } from 'react';

// import type { PageProps as ParentPageProps } from '../../../../_types';

export type PageProps = {
	params: Promise<{
		project: string;
		team: string;
	}>;
};
export type LayoutProps = PropsWithChildren<PageProps>;
