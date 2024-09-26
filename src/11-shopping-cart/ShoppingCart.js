import { useState } from 'react';

const items = [
	{
		name: 'apple',
		price: 0.39,
	},
	{
		name: 'banana',
		price: 0.79,
	},
	{
		name: 'cherry tomatoes',
		price: 3.99,
	},
];

function ShoppingCart() {
	const [cart, setCart] = useState([]);
	const addToCart = (item) => {
		//check if item is already in cart

		let cartCopy = [...cart];
		const itemInCart = cartCopy.find((cartItem) => cartItem.name === item.name);
		if (itemInCart) {
			//if item is already in cart, increment quantity
			itemInCart.quantity += 1;
			setCart(cartCopy);
			return;
		}
		setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
	};

	const increaseItemQuantity = (itemName) => {
		let cartCopy = [...cart];
		const itemInCart = cartCopy.find((cartItem) => cartItem.name === itemName);

		itemInCart.quantity += 1;
		setCart(cartCopy);
	};

	const decreaseItemQuantity = (itemName) => {
		let cartCopy = [...cart];
		const itemInCart = cartCopy.find((cartItem) => cartItem.name === itemName);
		if (itemInCart.quantity > 1) {
			itemInCart.quantity -= 1;
			setCart(cartCopy);
		}
		if (itemInCart.quantity === 1) {
			const newCart = cart.filter((item) => item.name !== itemName);
			setCart(newCart);
			return;
		}
	};
	const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

	return (
		<div>
			<h1>Shopping Cart</h1>
			<div className='cart'>
				<div className='items'>
					<h2>Items</h2>
					{items.map((item) => (
						<div key={item.name}>
							<h3>{item.name}</h3>
							<p>${item.price}</p>
							<button onClick={() => addToCart(item)}>Add to Cart</button>
						</div>
					))}
				</div>
				<div>
					<h2>Cart</h2>
					{cart.map((item) => (
						<div key={item.name}>
							<h3>{item.name}</h3>
							<p>
								<button onClick={() => decreaseItemQuantity(item.name)}>
									-
								</button>
								{item.quantity}
								<button onClick={() => increaseItemQuantity(item.name)}>
									+
								</button>
							</p>
							<p>Subtotal: ${(item.quantity * item.price).toFixed(2)}</p>
						</div>
					))}
				</div>
			</div>
			<div className='total'>
				<h2>Total: ${cartTotal.toFixed(2)}</h2>
			</div>
		</div>
	);
}

export default ShoppingCart;
