import { PropsWithChildren } from 'react';

import { PageProps } from '@/app/[team]/_types';

export type PageProps = PageProps & {
	params: {
		project: string;
	};
};

export type LayoutProps = PropsWithChildren<PageProps>;
