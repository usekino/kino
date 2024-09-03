'use client';

import type { UsersSchema } from '@/lib/schema/users.schema';
import type { User } from 'lucia';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usersSchema } from '@/lib/schema/users.schema';
import { api } from '@/lib/trpc/clients/client';

export const UserSettingsForm = ({ user }: { user: User }) => {
	const router = useRouter();

	const { mutate: updateUser } = api.user.update.useMutation({
		onSuccess: () => {
			toast.success('User updated');
			router.refresh();
		},
		onError: (err) => {
			toast.error('Error', { description: err.message });
		},
	});

	const { control, handleSubmit, formState } = useForm<UsersSchema['Update']>({
		defaultValues: usersSchema.update.parse(user),
		resolver: zodResolver(usersSchema.update),
	});

	const onSubmit = (data: UsersSchema['Update']) => {
		updateUser(data);
	};

	return (
		<div>
			<form className='grid gap-4' onSubmit={handleSubmit(onSubmit)}>
				<div className='grid gap-2'>
					<Label htmlFor='username'>Username</Label>
					<Controller
						control={control}
						name='username'
						render={(ctx) => (
							<>
								<Input {...ctx.field} id='email' placeholder='m@example.com' required />
								{ctx.fieldState.error ? <em>{ctx.fieldState.error.message}</em> : null}
							</>
						)}
					/>
				</div>
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
					<Label htmlFor='name'>Name</Label>
					<Controller
						control={control}
						name='name'
						render={({ field, fieldState }) => {
							const { value, ...props } = field;
							return (
								<>
									<Input {...props} value={value ?? ''} id='name' placeholder='John Doe' required />
									{fieldState.error ? <em>{fieldState.error.message}</em> : null}
								</>
							);
						}}
					/>
				</div>
				<Button type='submit' className='w-full'>
					{formState.isSubmitting ? '...' : 'Sign In'}
				</Button>
			</form>
		</div>
	);
};
