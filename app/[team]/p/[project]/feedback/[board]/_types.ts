import type { PageProps as ParentPageProps } from '../../_types';

import { PropsWithChildren } from 'react';

export type PageProps = ParentPageProps & {
	params: {
		board: string;
	};
};

export type LayoutProps = PropsWithChildren<PageProps>;
