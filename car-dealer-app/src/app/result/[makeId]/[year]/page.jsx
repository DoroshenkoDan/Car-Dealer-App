export async function generateStaticParams() {
	const cars = await fetch(
		'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
	).then(res => res.json());
	console.log(cars);

	return cars.Results.map(car => ({
		makeId: car.slug,
		year: car.year,
	}));
}

export default async function Page({ params }) {
	const { makeId, year } = await params;
	console.log(makeId, year);

	const response = await fetch(
		`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
	);
	const data = await response.json();
	console.log('Car:', data);

	const cars = data.Results || [];

	return (
		<div className='flex justify-between gap-2'>
			{cars.map((car, index) => (
				<div className='border-2' key={index}>
					<p>Make ID: {car.Make_ID}</p>
					<p>Make Name: {car.Make_Name}</p>
					<p>Model ID: {car.Model_ID}</p>
					<p>Model Name: {car.Model_Name}</p>
				</div>
			))}
		</div>
	);
}
