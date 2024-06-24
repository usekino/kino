import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default async function ForgotPasswordPage() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-2xl'>Sign In</CardTitle>
				<CardDescription>Login to your existing account</CardDescription>
			</CardHeader>
			<CardContent>
				{/* Placeholder */}
				<div className='flex items-center gap-3'>
					<Input placeholder='Email' />
					<Button>Send reset link</Button>
				</div>
				<div className='mt-4 text-center text-sm'>
					Don&apos;t have an account?{' '}
					<Link href='/sign-up' className='underline'>
						Sign up
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
