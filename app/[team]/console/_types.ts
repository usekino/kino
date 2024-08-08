import { PropsWithChildren } from 'react';

export type PageProps = {
	params: {
		team: string;
	};
};

export type LayoutProps = PropsWithChildren<PageProps>;
