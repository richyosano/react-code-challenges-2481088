import React, { createContext, useContext, useMemo, useState } from 'react';

const ColorContext = createContext({
	selectedColor: '',
	setSelectedColor: () => {},
});

function ColorPicker() {
	const colors = ['red', 'blue', 'yellow', 'green', 'black', 'white', 'purple'];
	const { setSelectedColor } = useContext(ColorContext);

	return (
		<div>
			<h1>Choose a color</h1>
			{colors.map((color) => (
				<button
					key={color}
					onClick={() => setSelectedColor(color)}
					style={{ backgroundColor: color }}
				/>
			))}
		</div>
	);
}

function Pixel() {
	const { selectedColor } = useContext(ColorContext);
	const [pixelColor, setPixelColor] = useState('lightgrey');

	return (
		<div
			style={{
				height: '20px',
				width: '20px',
				backgroundColor: pixelColor,
				margin: '2px',
			}}
			onClick={() => setPixelColor(selectedColor)}
		/>
	);
}

function Pixels() {
	const pixels = [];
	for (let i = 0; i < 100; i++) pixels.push(<Pixel key={i} id={i} />);
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(10, 1fr)',
				width: '210px',
				margin: '0 auto',
			}}
		>
			{pixels}
		</div>
	);
}

export default function PixelArt() {
	const [selectedColor, setSelectedColor] = useState('');
	const value = useMemo(
		() => ({ selectedColor, setSelectedColor }),
		[selectedColor, setSelectedColor]
	);
	return (
		<ColorContext.Provider value={value}>
			<ColorPicker />
			<Pixels />
		</ColorContext.Provider>
	);
}
