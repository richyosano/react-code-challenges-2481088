import { useState } from 'react';

export default function FormValidator() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [validationMessage, setValidationMessage] = useState('');

	const findErrors = () => {
		const errors = [];
		if (!email || !password || !passwordConfirm) {
			errors.push('All items must contain a value');
		}
		if ([...email].filter((chr) => chr === '@').length !== 1) {
			errors.push('An email must have exactly one @ sign');
		}
		if (password.length < 8) {
			errors.push('Passwords must be 8 characters or longer');
		}
		if (password !== passwordConfirm) {
			errors.push('Passwords must match');
		}

		return errors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const errors = findErrors();
		setValidationMessage(errors.length ? errors.join(', ') : 'User Created!');
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Sign Up!</h2>
			<label htmlFor='email'>Email</label>
			<input type='text' name='email' onChange={(e) => setEmail(e.target.value)} />
			<label htmlFor='password'>Password</label>
			<input
				type='password'
				name='password'
				onChange={(e) => setPassword(e.target.value)}
			/>
			<label htmlFor='password-confirm'>Confirm Password </label>
			<input
				type='password'
				name='password-confirm'
				onChange={(e) => setPasswordConfirm(e.target.value)}
			/>
			{validationMessage}
			<input type='submit' value='Submit' />
		</form>
	);
}
