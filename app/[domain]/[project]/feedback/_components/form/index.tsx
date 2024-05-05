import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export const FeedbackForm = () => {
	return (
		<form className='space-y-4'>
			<div className='grid grid-cols-2 gap-4'>
				<div className='space-y-2'>
					<Label className='text-sm font-medium' htmlFor='name'>
						Name
					</Label>
					<Input id='name' placeholder='Enter your name' type='text' />
				</div>
				<div className='space-y-2'>
					<Label className='text-sm font-medium' htmlFor='email'>
						Email
					</Label>
					<Input id='email' placeholder='Enter your email' type='email' />
				</div>
			</div>
			<div className='space-y-2'>
				<label className='text-sm font-medium' htmlFor='feedback'>
					Feedback
				</label>
				<Textarea id='feedback' placeholder='Enter your feedback' rows={4} />
			</div>
			<Button type='submit'>Submit Feedback</Button>
		</form>
	);
};
