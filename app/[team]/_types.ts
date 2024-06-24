import { PropsWithChildren } from 'react';

export type TeamPageParams = {
	team: string;
};

export type TeamPageProps = PropsWithChildren<{
	params: TeamPageParams;
}>;
