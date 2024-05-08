import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getUser } from '@/lib/auth/utils';

import { SignInForm } from './_components/sign-in-form';

export default async function SignInPage() {
	const user = await getUser();

	if (user) {
		return redirect('/authed');
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-2xl'>Sign In</CardTitle>
				<CardDescription>Login to your existing account</CardDescription>
			</CardHeader>
			<CardContent>
				<SignInForm />
				<div className='mt-4 space-y-2 text-center text-sm'>
					<div>
						Don&apos;t have an account?{' '}
						<Link href='/sign-up' className='underline'>
							Sign up
						</Link>
					</div>
					<div>
						Forgot your password?{' '}
						<Link href='/forgot-password' className='underline'>
							Reset it
						</Link>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
