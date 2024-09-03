import { useReducer } from 'react';

const initialState = {
	firstNumber: 0,
	secondNumber: 0,
	result: null,
};

function reducer(state, action) {
	switch (action.type) {
		case 'set_first_number': {
			return {
				...state,
				firstNumber: action.firstNumber,
			};
		}
		case 'set_second_number': {
			return {
				...state,
				secondNumber: action.secondNumber,
			};
		}
		case 'add_numbers': {
			return {
				...state,
				result: state.firstNumber + state.secondNumber,
			};
		}
		case 'subtract_numbers': {
			return {
				...state,
				result: state.firstNumber - state.secondNumber,
			};
		}
		case 'reset_numbers': {
			return initialState;
		}
		default: {
			return state;
		}
	}
}

export default function SimpleCalculator() {
	const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div>
			<div>
				<h2>Number 1</h2>
				{numbers.map((number) => (
					<button
						key={number}
						onClick={() =>
							dispatch({ type: 'set_first_number', firstNumber: number })
						}
					>
						{number}
					</button>
				))}
			</div>
			<div>
				<h2>Number 2</h2>
				{numbers.map((number) => (
					<button
						key={number}
						onClick={() =>
							dispatch({ type: 'set_second_number', secondNumber: number })
						}
					>
						{number}
					</button>
				))}
			</div>
			<div>
				<h2>Actions</h2>
				<button onClick={() => dispatch({ type: 'add_numbers' })}>+</button>
				<button onClick={() => dispatch({ type: 'subtract_numbers' })}>-</button>
				<button onClick={() => dispatch({ type: 'reset_numbers' })}>c</button>
			</div>
			<div>
				<h2>Result: {state.result ?? 'No Result Yet'}</h2>
			</div>
		</div>
	);
}
