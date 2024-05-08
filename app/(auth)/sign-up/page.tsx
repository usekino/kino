import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { SignUpForm } from './_components/sign-up-form';

export default function SignUpPage() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-2xl'>Sign Up</CardTitle>
				<CardDescription>Create an account to get started</CardDescription>
			</CardHeader>
			<CardContent>
				<SignUpForm />
				<div className='mt-4 text-center text-sm'>
					Already have an account?{' '}
					<Link href='/sign-in' className='underline'>
						Sign in
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
