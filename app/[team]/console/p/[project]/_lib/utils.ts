import type { PropsWithChildren } from 'react';

export type ProjectPageParams = { params: { project: string; team: string } };
export type ProjectLayoutParams = PropsWithChildren<ProjectPageParams>;
