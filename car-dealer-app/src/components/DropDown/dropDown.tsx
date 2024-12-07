'use client';

import React, { useEffect, useRef, useState } from 'react';

interface DropDownProps {
	items: number[] | { MakeName: string; MakeId: number }[];
	tittle: string;
	onSelect: (item: string | number) => void;
}

const DropDown: React.FC<DropDownProps> = ({ items, tittle, onSelect }) => {
	console.log('Items', items);

	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState('Select');
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleClickOutside = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	const handleItemClick = (
		item: number | { MakeName: string; MakeId: number }
	) => {
		if (typeof item === 'object') {
			setSelectedItem(item.MakeName);
			onSelect(item.MakeId);
		} else {
			setSelectedItem(item.toString());
			onSelect(item);
		}
		setIsOpen(false);
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='relative inline-block text-left' ref={dropdownRef}>
			<p className='text-center'>{tittle}</p>
			<button
				onClick={toggleDropdown}
				className='inline-flex justify-center w-72 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700'
			>
				{selectedItem}
				<svg
					className={`-mr-1 ml-2 h-5 w-5 transition-transform duration-300 ${
						isOpen ? 'transform rotate-180' : ''
					}`}
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 20 20'
					fill='currentColor'
				>
					<path
						fillRule='evenodd'
						d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
						clipRule='evenodd'
					/>
				</svg>
			</button>

			<div
				className={`origin-top-right relative sm:absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-y-auto transition-max-height duration-300 ease-out ${
					isOpen ? 'max-h-72' : 'max-h-0'
				}`}
				role='menu'
				aria-orientation='vertical'
				aria-labelledby='options-menu'
			>
				<div className='py-1' role='none'>
					{items.map((item, index) =>
						typeof item === 'object' ? (
							<p
								key={index}
								onClick={() => handleItemClick(item)}
								className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
								role='menuitem'
							>
								{item.MakeName}
							</p>
						) : (
							<p
								key={index}
								onClick={() => handleItemClick(item)}
								className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
								role='menuitem'
							>
								{item}
							</p>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default DropDown;
