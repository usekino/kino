'use client';

import type { CreateProjectSchema } from '@/lib/schema/project.schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { SiGithub } from '@icons-pack/react-simple-icons';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { env } from '@/lib/env/client';
import { createProjectSchema } from '@/lib/schema/project.schema';
import { api } from '@/lib/trpc/clients/client';
import { API } from '@/lib/trpc/routers/_app';
import { slugify } from '@/lib/utils';

type CreateProjectProps = {
	teams: API['output']['dashboard']['userTeams'];
};

export function CreateProjectForm({ teams: initialTeams }: CreateProjectProps) {
	const router = useRouter();

	const teams = initialTeams.map((team) => {
		return team.team;
	});

	const { mutate: createProject } = api.project.create.useMutation({
		onSuccess: ({ teamSlug, projectSlug }) => {
			toast.success('Project created');
			router.push(`https://${teamSlug}.${env.NEXT_PUBLIC_ROOT_DOMAIN}/${projectSlug}`);
		},
		onError: (error) => {
			toast.error('Error', { description: error.message });
		},
	});

	const form = useForm<CreateProjectSchema>({
		defaultValues: {
			teamId: teams[0].id,
			name: '',
			slug: '',
			githubUrl: null,
		},
		resolver: zodResolver(createProjectSchema),
	});

	const onSubmit = async (data: CreateProjectSchema) => {
		createProject(data);
	};

	const selectedTeam = teams.find((team) => {
		return team.id === form.watch('teamId');
	});

	return (
		<div className='flex items-start justify-center rounded-lg border bg-card p-10'>
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
													key={team.id}
													value={team.id}
													onSelect={() => {
														field.onChange(team.id);
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
									<Input {...field} />
								</FormControl>
								<FormDescription>This is your project&apos;s public display name.</FormDescription>
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
									<div className='flex items-stretch'>
										<div className='flex items-center rounded-l-md border bg-background px-3'>
											<span className='opacity-75'>
												{!!selectedTeam?.slug ? selectedTeam.slug : 'acme'}.usekino.com/
											</span>
										</div>
										<Input
											className='relative z-10 rounded-l-none rounded-r-md'
											{...field}
											onChange={(e) => {
												field.onChange(slugify(e.target.value));
											}}
											type='text'
										/>
									</div>
								</FormControl>
								<FormDescription>Only letters, numbers, and dashes are allowed.</FormDescription>
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
									<div className='flex items-stretch'>
										<div className='flex items-center rounded-l-md border bg-background px-3'>
											<div className='flex items-center gap-2 opacity-75'>
												<SiGithub size={16} />
												https://
											</div>
										</div>
										<Input
											className='relative z-10 rounded-l-none rounded-r-md'
											type='url'
											placeholder='github.com/acme-inc/repo'
											{...field}
											value={field.value ?? ''}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div>
						<Button type='submit'>
							{form.formState.isSubmitting ? 'Creating...' : 'Create project'}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
