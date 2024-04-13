import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';

import { MutateUserSchema, mutateUserSchema } from '@/lib/db/schema/users';

export const UserSettingsForm = () => {
	const form = useForm<MutateUserSchema, typeof zodValidator>({
		defaultValues: {
			username: '',
			email: '',
			name: '',
		},
		onSubmit: async (values) => {
			console.log(values);
		},
		validatorAdapter: zodValidator,
		validators: {
			onChange: mutateUserSchema,
		},
	});

	return (
		<div>
			<form>
				<form.Field name='username'>
					{(field) => (
						<>
							<label htmlFor={field.name}>Age:</label>
							<input
								id={field.name}
								name={field.name}
								value={field.state.value}
								type='string'
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							{field.state.meta.errors ? (
								<em role='alert'>{field.state.meta.errors.join(', ')}</em>
							) : null}
						</>
					)}
				</form.Field>
			</form>
		</div>
	);
};
