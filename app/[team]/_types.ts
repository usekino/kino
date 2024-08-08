import { PropsWithChildren } from 'react';

export type TeamPageProps = {
	params: {
		team: string;
	};
};

export type LayoutProps = PropsWithChildren<TeamPageProps>;
