import type { PropsWithChildren } from 'react';
import type { PageParams as ParentPageParams } from '../../_types';

export type PageParams = ParentPageParams & {
	params: {
		project: string;
	};
};
export type LayoutParams = PropsWithChildren<PageParams>;
