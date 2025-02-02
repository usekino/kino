'use client';

import type { ExtendedComponentProps } from '@/lib/types';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';

import { cn } from '@/lib/utils';

export type TextAreaProps = ExtendedComponentProps<
	'textarea',
	{
		adaptive?: boolean | number;
		error?: string;
		children?: ((state: ChildrenState) => React.ReactNode) | React.ReactNode;
		onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>, data: OnChangeData) => void;
	}
>;

type ChildrenState = {
	value: TextAreaProps['value'];
	isDirty: boolean;
	maxLength: number;
};

type OnChangeData = {
	isDirty: boolean;
};

/**
 * ✳️ — A textarea component with optional adaptive height.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	(
		{
			rows = 2,
			adaptive = true,
			maxLength = 1000,
			children,
			// id,
			// error,
			onChange,
			...props
		}: TextAreaProps,
		ref
	) => {
		const inputRef = useRef<HTMLTextAreaElement>(null);
		const [value, setValue] = useState(props.defaultValue ?? '');
		const [isDirty, setIsDirty] = useState(false);

		useEffect(() => {
			if (inputRef.current && !!adaptive) {
				inputRef.current.style.height = 'auto';
				const scrollHeight = inputRef.current.scrollHeight;

				// Set the bumper to adjust for the border
				const heightBumper = typeof adaptive === 'number' ? adaptive : 2;

				if (!!value) {
					inputRef.current.style.height = scrollHeight + heightBumper + 'px';
				} else {
					inputRef.current.style.height = 'auto';
				}
			}
		}, [inputRef, value, adaptive]);

		// Dirty checker
		useEffect(() => {
			if ((props.defaultValue && props.defaultValue !== value) || (!props.defaultValue && value)) {
				setIsDirty(true);
			} else {
				setIsDirty(false);
			}
		}, [props.defaultValue, value]);

		const render = () => {
			if (typeof children === 'function') {
				return children({ value, isDirty, maxLength });
			}
			return children;
		};

		return (
			<>
				<textarea
					ref={mergeRefs([inputRef, ref])}
					onChange={(e) => {
						setValue(e.target.value);
						onChange?.(e, {
							isDirty,
						});
					}}
					className={cn(
						'flex w-full rounded-md border border-input bg-native px-3 py-2 text-sm text-native-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
						adaptive && 'resize-none',
						props.className
					)}
					maxLength={maxLength}
					rows={rows}
					{...props}
				/>
				{render()}
			</>
		);
	}
);
Textarea.displayName = 'Textarea';
