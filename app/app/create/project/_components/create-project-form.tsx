'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { env } from '@/lib/env/client';
import { api } from '@/lib/trpc/clients/client';
import { slugify } from '@/lib/utils';
import { CreateProjectSchema, createProjectSchema } from '@/lib/validation/project-validation';
import { ReadTeamSchema } from '@/lib/validation/team-validation';

export function CreateProjectForm({ teams }: { teams: ReadTeamSchema[] }) {
	const router = useRouter();
	const { mutate: createProject } = api.project.create.useMutation({
		onSuccess: ({ teamSlug, projectSlug }) => {
			toast.success('Project created');
			router.push(`https://${teamSlug}.${env.NEXT_PUBLIC_ROOT_DOMAIN}/project/${projectSlug}`);
		},
		onError: (error) => {
			toast.error('Error', { description: error.message });
		},
	});

	const form = useForm<CreateProjectSchema>({
		defaultValues: {
			teamId: '',
			name: '',
			slug: '',
			githubUrl: null,
		},
		resolver: zodResolver(createProjectSchema),
	});

	const onSubmit = async (data: CreateProjectSchema) => {
		// console.log(data);
		createProject(data);
	};

	return (
		<div className='flex items-start justify-center'>
			<Form {...form}>
				<form className='w-full space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='teamId'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Team</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select a team' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{teams.map((team) => (
												<SelectItem
													key={team.slug}
													value={team.id}
													onSelect={() => {
														field.onChange(team.slug);
													}}
													className='text-sm'
												>
													{team.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
								<FormDescription>Select a team to create your project in.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Project name</FormLabel>
								<FormControl>
									<Input placeholder='Fancy Project' {...field} />
								</FormControl>
								<FormDescription>This is your project's public display name.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='slug'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Project slug</FormLabel>
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
									Your project will be available at{' '}
									<strong>
										PLACEHOLDER.usekino.com/project/
										{!!form.watch('slug') ? form.watch('slug') : 'fancy-project'}
									</strong>
									. Only letters, numbers, and dashes are allowed.
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
										placeholder='Enter a short description of your project'
										{...field}
										value={field.value ?? ''}
									/>
								</FormControl>
								<FormDescription>Tell us a little bit about your project.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='githubUrl'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Github (optional)</FormLabel>
								<FormControl>
									<Input
										type='url'
										placeholder='https://github.com/acme-inc/repo'
										{...field}
										value={field.value ?? ''}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' className='w-full'>
						{form.formState.isSubmitting ? 'Creating...' : 'Create project'}
					</Button>
				</form>
			</Form>
		</div>
	);
}
