'use client';

import Link from 'next/link';
import React from 'react';

interface NextButtonProps {
	isEnabled: boolean;
	href: string;
}

const NextButton: React.FC<NextButtonProps> = ({ isEnabled, href }) => {
	return (
		<Link href={isEnabled ? href : '#'} passHref>
			<button
				className={`mt-4 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 ${
					isEnabled ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
				}`}
				disabled={!isEnabled}
			>
				Next
			</button>
		</Link>
	);
};

export default NextButton;
