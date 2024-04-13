import { from, resend, to } from '@/lib/email';
import { getBaseUrl } from '@/lib/util/get-base-url';

type VerifyEmailProps = {
	code: string;
	email: string;
	username: string;
	signUp?: boolean;
};

export const VerifySignUpEmail = (props: Omit<VerifyEmailProps, 'signUp'>) => {
	const url = `${getBaseUrl()}/verify/code?email=${props.email}&code=${props.code}`;
	return (
		<div>
			<h1>Verify your email — RAD</h1>
			<div>
				<p>
					Hey, thanks for signing up! 👋 In order to fully enable your account we need you to verify
					your email.
				</p>
				<p>
					Use the code{' '}
					<span
						style={{
							fontFamily: 'monospace',
							fontWeight: '900',
						}}
					>
						{props.code}
					</span>
					{` `}to{` `}
					<a
						href={url}
						style={{
							textDecoration: 'underline',
						}}
					>
						verify your email
					</a>
					.
				</p>
				<p>If you did not sign up or request this email, please do nothing.</p>
			</div>
		</div>
	);
};

export const VerifyEmail = (props: Omit<VerifyEmailProps, 'signUp'>) => {
	const url = `${getBaseUrl()}/verify/code?email=${props.email}&code=${props.code}`;

	return (
		<div>
			<h1>Verify your email — RAD</h1>
			<div>
				<p>We received a requested to verify your account.</p>
				<p>
					Use the code{' '}
					<span
						style={{
							fontFamily: 'monospace',
							fontWeight: '900',
						}}
					>
						{props.code}
					</span>
					{` `}to{` `}
					<a
						href={url}
						style={{
							textDecoration: 'underline',
						}}
					>
						verify your email
					</a>
					.
				</p>
				<p>If you did not sign up or request this email, please do nothing.</p>
			</div>
		</div>
	);
};

export const sendAccountVerification = async (data: VerifyEmailProps) => {
	const { code, email, username, signUp = false } = data;

	const emailToSend = () => {
		if (signUp) {
			return VerifySignUpEmail({
				code,
				email,
				username,
			});
		}

		return VerifyEmail({
			code,
			email,
			username,
		});
	};

	const res = await resend.emails
		.send({
			from,
			to: to(email),
			subject: 'Verify email - Kino',
			react: emailToSend(),
		})
		.then((response) => response)
		.catch((error) => {
			console.error(error, { code: '93c703f9' });
		});

	if (!res?.data?.id) {
		throw new Error('Email could not be sent');
	}

	return res;
};
