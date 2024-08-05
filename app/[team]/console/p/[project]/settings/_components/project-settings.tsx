import { Button } from '@/components/ui/button';
import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export function ProjectSettings() {
	return (
		<div className='grid gap-6 divide-y py-6'>
			<div>
				<CardHeader>
					<CardTitle>General</CardTitle>
					<CardDescription>
						Update your project&apos;s name, description, and other general settings.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form className='space-y-4'>
						<div className='space-y-1'>
							<Label htmlFor='name'>Project Name</Label>
							<Input defaultValue='Acme Inc' id='name' />
						</div>
						<div className='space-y-1'>
							<Label htmlFor='description'>Description</Label>
							<Textarea defaultValue='This is the main project for Acme Inc.' id='description' />
						</div>
						<div className='space-y-1'>
							<Label htmlFor='url'>Project URL</Label>
							<Input defaultValue='https://acme.com' id='url' />
						</div>
					</form>
				</CardContent>
				<CardFooter>
					<Button>Save Changes</Button>
				</CardFooter>
			</div>
			<div>
				<CardHeader>
					<CardTitle>Billing</CardTitle>
					<CardDescription>Update your billing information and payment method.</CardDescription>
				</CardHeader>
				<CardContent>
					<form className='space-y-4'>
						<div className='space-y-1'>
							<Label htmlFor='plan'>Subscription Plan</Label>
							<Select defaultValue='pro'>
								<SelectTrigger>
									<SelectValue placeholder='Select a team' />
								</SelectTrigger>

								<SelectContent>
									<SelectItem value='free'>Free</SelectItem>
									<SelectItem value='pro'>Pro</SelectItem>
									<SelectItem value='enterprise'>Enterprise</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className='space-y-1'>
							<Label htmlFor='card'>Payment Method</Label>
							<Input defaultValue='**** **** **** 1234' id='card' readOnly />
						</div>
						<div className='space-y-1'>
							<Label htmlFor='email'>Billing Email</Label>
							<Input defaultValue='john@acme.com' id='email' />
						</div>
					</form>
				</CardContent>
				<CardFooter>
					<Button>Update Billing</Button>
				</CardFooter>
			</div>
			<div>
				<CardHeader>
					<CardTitle>Notifications</CardTitle>
					<CardDescription>Manage your notification preferences for this project.</CardDescription>
				</CardHeader>
				<CardContent>
					<form className='space-y-4'>
						<div className='flex items-start space-x-4'>
							<Checkbox defaultChecked id='email-notifications' />
							<div className='space-y-1'>
								<Label htmlFor='email-notifications'>Email Notifications</Label>
								<p className='text-sm text-gray-500 dark:text-gray-400'>
									Receive email notifications for important updates and events.
								</p>
							</div>
						</div>
						<div className='flex items-start space-x-4'>
							<Checkbox id='slack-notifications' />
							<div className='space-y-1'>
								<Label htmlFor='slack-notifications'>Slack Notifications</Label>
								<p className='text-sm text-gray-500 dark:text-gray-400'>
									Receive notifications in your Slack workspace.
								</p>
							</div>
						</div>
						<div className='flex items-start space-x-4'>
							<Checkbox defaultChecked id='mobile-notifications' />
							<div className='space-y-1'>
								<Label htmlFor='mobile-notifications'>Mobile Notifications</Label>
								<p className='text-sm text-gray-500 dark:text-gray-400'>
									Receive push notifications on your mobile devices.
								</p>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter>
					<Button>Save Notification Settings</Button>
				</CardFooter>
			</div>
		</div>
	);
}
