'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { getMakesForVehicleType } from '../api/vehicleRequests';
import NextButton from '../components/ButtonNext/ButtonNext';
import DropDown from '../components/DropDown/dropDown';
import { getYears } from '../helpers/getYears';
const Home: React.FC = () => {
	const [vehicleMakes, setVehicleMakes] = useState<
		{ MakeName: string; MakeId: number }[]
	>([]);
	const [years, setYears] = useState<number[]>([]);
	const [makeId, setMakeId] = useState<string | number | null>(null);
	const [year, setYear] = useState<string | null>(null);

	useEffect(() => {
		const fetchVehicleMakes = async () => {
			try {
				const data = await getMakesForVehicleType();
				setVehicleMakes(
					data.Results.map((make: any) => ({
						MakeName: make.MakeName,
						MakeId: make.MakeId,
					}))
				);
			} catch (error) {
				console.error('Error fetching vehicle makes:', error);
			}
		};

		fetchVehicleMakes();
		setYears(getYears());
	}, []);

	const handleMakeSelect = (make: string | number) => {
		setMakeId(make);
	};

	const handleYearSelect = (year: string) => {
		setYear(year);
	};

	const isNextButtonEnabled = makeId && year;

	return (
		<div>
			<Suspense fallback={'Loading'}>
				<DropDown
					items={vehicleMakes}
					tittle='Choose Car'
					onSelect={handleMakeSelect}
				/>

				<DropDown
					items={years}
					tittle='Choose Year'
					onSelect={handleYearSelect}
				/>
				<NextButton
					isEnabled={!!isNextButtonEnabled}
					href={`/result/${makeId}/${year}`}
				/>
			</Suspense>
		</div>
	);
};

export default Home;
