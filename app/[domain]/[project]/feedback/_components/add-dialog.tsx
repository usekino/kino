'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { FeedbackForm } from './form';

export const AddDialog = () => {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='gap-2'>
					<Plus size={16} />
					<span>Add feedback</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add feedback</DialogTitle>
					<DialogDescription>Add feedback to this project.</DialogDescription>
				</DialogHeader>
				<FeedbackForm onClose={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	);
};
