'use client';

import type { TeamsSchema } from '@/lib/schema/teams/teams.schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { Link, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Heading } from '@/components/heading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
// import { env } from '@/lib/env/client';
import { teamsSchema } from '@/lib/schema/teams/teams.schema';
import { api } from '@/lib/trpc/clients/client';
import { cn, slugify } from '@/lib/utils';

export function CreateTeamForm() {
	const router = useRouter();
	const { mutate: createTeam } = api.team.create.useMutation({
		onSuccess: ({ slug }) => {
			toast.success('Team created');
			router.push(`/~/${slug}`);
		},
		onError: (error) => {
			toast.error('Error', { description: error.message });
		},
	});

	const form = useForm<TeamsSchema['Create']>({
		defaultValues: {
			name: '',
			slug: '',
		},
		resolver: zodResolver(teamsSchema.create),
	});

	const onSubmit = async (data: TeamsSchema['Create']) => createTeam(data);

	return (
		<div className='flex flex-col-reverse items-stretch md:flex-row'>
			<div className='rounded-b-lg border bg-card p-8 md:w-1/3 md:rounded-l-lg md:rounded-br-none'>
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
											<div className='flex items-stretch'>
												<Input
													className='relative z-10 rounded-l-md rounded-r-none'
													{...field}
													onChange={(e) => {
														field.onChange(slugify(e.target.value));
													}}
													type='text'
												/>
												<div className='flex items-center rounded-r-md border bg-background px-3'>
													.usekino.com
												</div>
											</div>
										</FormControl>
										<FormDescription>
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
							<Button type='submit' className='w-auto'>
								{form.formState.isSubmitting ? 'Creating...' : 'Create team'}
							</Button>
						</form>
					</Form>
				</div>
			</div>
			<div className='relative flex flex-col items-center justify-center rounded-t-lg border-b-0 border-l border-r border-t bg-background p-10 md:w-2/3 md:rounded-r-lg md:rounded-tl-none md:border-b md:border-l-0 md:border-t md:p-8'>
				<div className='absolute top-0 rounded-b border-x border-b bg-accent/20 px-3 py-1 text-sm text-muted-foreground'>
					Team profile preview
				</div>
				<Avatar className='h-20 w-20 shadow-[0_10px_50px_rgba(255,255,255,0.10)]'>
					<AvatarImage alt='@shadcn' src='/avatars/01.png' />
					<AvatarFallback>OM</AvatarFallback>
				</Avatar>
				<Heading
					tag='span'
					variant='h3'
					className={cn(
						!form.watch('name') && 'opacity-50',
						'mt-2 drop-shadow-[0_5px_10px_rgba(255,255,255,0.25)]'
					)}
				>
					{!!form.watch('name') ? form.watch('name') : 'ACME Inc.'}
				</Heading>
				<div className={cn(!form.watch('slug') && 'opacity-50', 'mt-1 flex items-center gap-2')}>
					<Link size={14} />
					{!!form.watch('slug') ? form.watch('slug') : 'acme'}.usekino.com
				</div>
				<div className='mt-1 flex items-center gap-2 opacity-50'>
					<User size={14} />
					Inviting 0 members
				</div>
			</div>
		</div>
	);
}
