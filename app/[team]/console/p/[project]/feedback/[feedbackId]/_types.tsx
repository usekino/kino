import type { PageProps as ParentPageParams } from '../../_types';

import { PropsWithChildren } from 'react';

export type PageProps = ParentPageParams & {
	params: {
		feedbackId: string;
	};
};

export type LayoutProps = PropsWithChildren<PageProps>;
