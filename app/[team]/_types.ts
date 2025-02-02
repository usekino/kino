import type { PropsWithChildren } from 'react';

export type PageProps = {
	params: Promise<{
		team: string;
	}>;
};

export type LayoutProps = PropsWithChildren<PageProps>;
