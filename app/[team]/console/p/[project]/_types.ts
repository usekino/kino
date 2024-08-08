import type { PropsWithChildren } from 'react';
import type { PageProps as ParentPageParams } from '../../_types';

export type PageProps = ParentPageParams & {
	params: {
		project: string;
	};
};
export type LayoutProps = PropsWithChildren<PageProps>;
