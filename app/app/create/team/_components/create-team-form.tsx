'use client';

import type { CreateTeamSchema } from '@/lib/schema/team.schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { env } from '@/lib/env/client';
import { createTeamSchema } from '@/lib/schema/team.schema';
import { api } from '@/lib/trpc/clients/client';
import { slugify } from '@/lib/utils';

export function CreateTeamForm() {
	const router = useRouter();
	const { mutate: createTeam } = api.team.create.useMutation({
		onSuccess: ({ slug }) => {
			toast.success('Team created');
			router.push(`https://${slug}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`);
		},
		onError: (error) => {
			toast.error('Error', { description: error.message });
		},
	});

	const form = useForm<CreateTeamSchema>({
		defaultValues: {
			name: '',
			slug: '',
		},
		resolver: zodResolver(createTeamSchema),
	});

	const onSubmit = async (data: CreateTeamSchema) => createTeam(data);

	return (
		<div className='flex items-start justify-center'>
			<Form {...form}>
				<form className='w-full space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Team name</FormLabel>
								<FormControl>
									<Input placeholder='ACME Inc.' {...field} />
								</FormControl>
								<FormDescription>This is your team&apos;s public display name.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='slug'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Team slug</FormLabel>
								<FormControl>
									<Input
										placeholder='acme'
										{...field}
										onChange={(e) => {
											field.onChange(slugify(e.target.value));
										}}
									/>
								</FormControl>
								<FormDescription>
									Your team will be available at{' '}
									<strong>{!!form.watch('slug') ? form.watch('slug') : 'acme'}.usekino.com</strong>.
									Only letters, numbers, and dashes are allowed.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										className='min-h-[100px]'
										placeholder='Enter a short description of your team'
										{...field}
										value={field.value ?? ''}
									/>
								</FormControl>
								<FormDescription>Tell us a little bit about your team.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' className='w-full'>
						{form.formState.isSubmitting ? 'Creating...' : 'Create team'}
					</Button>
				</form>
			</Form>
		</div>
	);
}
