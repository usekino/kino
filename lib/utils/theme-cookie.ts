'use server';

import * as headers from 'next/headers';

import { env } from '../env/server';

export const setThemeCookie = async (theme: string) => {
	const cookies = await headers.cookies();

	cookies.set({
		name: 'theme',
		value: theme,
		domain: env.NEXT_PUBLIC_ROOT_DOMAIN,
		secure: process.env.NODE_ENV === 'production',
	});
};

export const getThemeCookie = async () => {
	const cookies = await headers.cookies();

	const themeCookie = cookies.get('theme');
	return themeCookie?.value;
};
