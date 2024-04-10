'use client';

import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';

import { signOutAction } from '@/lib/actions/users';

import { Button } from '../ui/button';

export default function SignOutBtn() {
	const router = useRouter();
	return (
		<form
			action={async () => {
				await signOutAction();
				router.refresh();
				router.push('/sign-in');
			}}
			className='w-full text-left'
		>
			<Btn />
		</form>
	);
}

const Btn = () => {
	const { pending } = useFormStatus();
	return (
		<Button type='submit' disabled={pending} variant={'destructive'}>
			Sign{pending ? 'ing' : ''} out
		</Button>
	);
};
