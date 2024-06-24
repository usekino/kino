import { redirect } from 'next/navigation';

import { getUser } from '@/lib/auth/utils';
import { env } from '@/lib/env/server';

import { deconstructTeamSlug } from '../_lib/get-team';
import { ConsoleNav } from './_components/console-nav';
import { PageParams } from './_types';

export default async function ConsoleLayout({ children, params }: PageParams) {
	const user = await getUser();
	const { subdomain: teamSlug } = deconstructTeamSlug(params.team);

	if (!user) {
		return redirect(`https://${teamSlug}.${env.NEXT_PUBLIC_ROOT_DOMAIN}/sign-in`);
	}

	return (
		<div className='relative flex h-svh w-full'>
			<div className='hidden h-full min-w-[250px] bg-native/50 lg:fixed lg:block'>
				<ConsoleNav />
			</div>
			<div className='h-full w-full bg-muted lg:ml-[250px]'>{children}</div>
		</div>
	);
}
