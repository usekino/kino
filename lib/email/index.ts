import { Resend } from 'resend';

import { env } from '@/lib/env/server';

export const resend = new Resend(env.RESEND_API_KEY);
export const from = 'Nate from Kino <hello@natedunn.net>';
export const to = (email: string) => {
	return env.RESEND_TEST_ADDRESS ? [env.RESEND_TEST_ADDRESS] : [email];
};
