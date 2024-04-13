'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from 'lucia';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/trpc/clients/client';
import { UpdateUserSchema, updateUserSchema } from '@/lib/validation/user-validation';

export const UserSettingsForm = ({ user }: { user: User }) => {
	const { mutate: updateUser } = api.user.update.useMutation({
		onSuccess: () => {
			toast.success('User updated');
		},
		onError: (err) => {
			toast.error('Error', { description: err.message });
		},
	});

	const { control, handleSubmit, formState } = useForm<UpdateUserSchema>({
		defaultValues: updateUserSchema.parse(user),
		resolver: zodResolver(updateUserSchema),
	});

	const onSubmit = (data: UpdateUserSchema) => {
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
