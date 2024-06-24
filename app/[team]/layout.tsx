import type { PropsWithChildren } from 'react';
import type { TeamPageParams } from './_lib/get-team';

import { notFound } from 'next/navigation';

import { getTeam } from './_lib/get-team';

export default async function DomainLayout({
  children,
  params,
}: PropsWithChildren<TeamPageParams>) {
  const team = await getTeam({
    teamParam: params.team,
  });

  if (!team.id) {
    return notFound();
  }

  return children;
}
