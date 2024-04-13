import Image from 'next/image';
import Link from 'next/link';

import { SignInForm } from './_components/sign-in-form';

export default function Dashboard() {
	return (
		<div className='h-full w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
			<div className='flex items-center justify-center py-12'>
				<div className='mx-auto grid w-[350px] gap-6'>
					<div className='grid gap-2 text-center'>
						<h1 className='text-3xl font-bold'>Login</h1>
						<p className='text-balance text-muted-foreground'>
							Enter your email below to login to your account
						</p>
					</div>
					<SignInForm />
					<div className='mt-4 space-y-1 text-center text-sm'>
						<span className='inline-block'>
							Don&apos;t have an account?{' '}
							<Link href='/sign-up' className='underline'>
								Sign up
							</Link>
						</span>
						<span className='inline-block'>
							<Link href='/forgot-password' className='ml-auto inline-block text-sm underline'>
								Forgot your password?
							</Link>
						</span>
					</div>
				</div>
			</div>
			<div className='relative hidden bg-muted lg:inline-flex'>
				<Image
					src='/bg-sign-in.webp'
					alt='Image'
					width='1920'
					height='1080'
					className='absolute inset-0 h-full w-full object-cover'
				/>
			</div>
		</div>
	);
}
