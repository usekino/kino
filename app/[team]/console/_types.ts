import { PropsWithChildren } from 'react';

export type PageParams = PropsWithChildren<{
	params: {
		team: string;
	};
}>;
