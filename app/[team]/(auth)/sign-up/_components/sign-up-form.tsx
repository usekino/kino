'use client';

import type { AuthSchema } from '@/lib/schema/auth.schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authSchema } from '@/lib/schema/auth.schema';
import { api } from '@/lib/trpc/clients/client';

export const SignUpForm = () => {
	const router = useRouter();
	const { mutate: signUpByEmail } = api.auth.signUpByEmail.useMutation({
		onSuccess: () => {
			toast.success('Signed up');
			// TODO: replace with a real redirect
			router.push('/authed');
		},
		onError: (error) => {
			toast.error('Error', { description: error.message });
		},
	});

	const { control, handleSubmit, formState } = useForm<AuthSchema['SignUpEmail']>({
		defaultValues: {
			email: '',
			confirmEmail: '',
			username: '',
			password: '',
			confirmPassword: '',
			inviteCode: '',
		},
		resolver: zodResolver(authSchema.signUpEmail),
	});

	const onSubmit = (data: AuthSchema['SignUpEmail']) => {
		signUpByEmail(data);
	};
	return (
		<div>
			<form className='grid gap-4' onSubmit={handleSubmit(onSubmit)}>
				<div className='grid gap-2'>
					<Label htmlFor='email'>Email</Label>
					<Controller
						control={control}
						name='email'
						render={(ctx) => (
							<>
								<Input {...ctx.field} id='email' placeholder='m@example.com' required />
								{ctx.fieldState.error ? <em>{ctx.fieldState.error.message}</em> : null}
							</>
						)}
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='confirmEmail'>Confirm Email</Label>
					<Controller
						control={control}
						name='confirmEmail'
						render={(ctx) => (
							<>
								<Input {...ctx.field} id='confirmEmail' placeholder='m@example.com' required />
								{ctx.fieldState.error ? <em>{ctx.fieldState.error.message}</em> : null}
							</>
						)}
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='username'>Username</Label>
					<Controller
						control={control}
						name='username'
						render={(ctx) => (
							<>
								<Input {...ctx.field} id='username' placeholder='username' required />
								{ctx.fieldState.error ? <em>{ctx.fieldState.error.message}</em> : null}
							</>
						)}
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='password'>Password</Label>
					<Controller
						control={control}
						name='password'
						render={(ctx) => (
							<>
								<Input {...ctx.field} placeholder='Password' required type='password' />
								{ctx.fieldState.error ? <em>{ctx.fieldState.error.message}</em> : null}
							</>
						)}
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='confirmPassword'>Confirm Password</Label>
					<Controller
						control={control}
						name='confirmPassword'
						render={(ctx) => (
							<>
								<Input
									{...ctx.field}
									id='confirmPassword'
									placeholder='Password'
									required
									type='password'
								/>
								{ctx.fieldState.error ? <em>{ctx.fieldState.error.message}</em> : null}
							</>
						)}
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='inviteCode'>Invite Code</Label>
					<Controller
						control={control}
						name='inviteCode'
						render={(ctx) => (
							<>
								<Input {...ctx.field} placeholder='Invite Code' />
								{ctx.fieldState.error ? <em>{ctx.fieldState.error.message}</em> : null}
							</>
						)}
					/>
				</div>
				<Button type='submit' className='w-full'>
					{formState.isSubmitting ? '...' : 'Sign In'}
				</Button>
			</form>
		</div>
	);
};
