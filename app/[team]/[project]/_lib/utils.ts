import type { PropsWithChildren } from 'react';

export type ProjectPageParams = { params: { project: string; domain: string } };

export type ProjectLayoutParams = PropsWithChildren<ProjectPageParams>;
