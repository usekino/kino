import type { ExtendedComponentProps } from '@/lib/types';

// import type { z } from 'zod';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// import { createFeedbackSchema } from '@/lib/validation/feedback.schema';

type FeedbackFormProps = ExtendedComponentProps<
	'form',
	{
		onClose: () => void;
	}
>;

export const FeedbackForm = (props: FeedbackFormProps) => {
	const { onClose, ...formProps } = props;

	// const form = useForm<z.infer<typeof createFeedbackSchema>>({
	// 	defaultValues: {
	// 		title: '',
	// 		description: '',
	// 	},
	// 	resolver: zodResolver(createFeedbackSchema),
	// });

	// const onSubmit = async (data: FeedbackFormData) => {
	// 	onClose();
	// };

	return (
		<form className='space-y-4' {...formProps}>
			<div className='space-y-2'>
				<Label className='text-sm font-medium' htmlFor='title'>
					Title
				</Label>
				<Input id='title' type='text' />
			</div>
			<div className='space-y-2'>
				<Label className='text-sm font-medium' htmlFor='description'>
					Description
				</Label>
				<Textarea id='description' rows={4} />
			</div>
			<div className='flex justify-between gap-2'>
				<Button type='submit'>Submit Feedback</Button>
				<Button type='button' variant='outline' onClick={() => onClose()}>
					Cancel
				</Button>
			</div>
		</form>
	);
};
