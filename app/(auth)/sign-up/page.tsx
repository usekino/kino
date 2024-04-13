'use client';

import Link from 'next/link';

import { SignUpForm } from './_components/sign-up-form';

export default function SignUpPage() {
	return (
		<main className='mx-auto my-4 max-w-lg bg-popover p-10'>
			<h1 className='text-center text-2xl font-bold'>Create an account</h1>
			<SignUpForm />
			<div className='mt-4 text-center text-sm text-muted-foreground'>
				Already have an account?{' '}
				<Link href='/sign-in' className='text-secondary-foreground underline'>
					Sign in
				</Link>
			</div>
		</main>
	);
}
