import type { PageProps as ParentPageProps } from '../../_types';

export type PageProps = ParentPageProps & {
	params: {
		board: string;
	};
};
