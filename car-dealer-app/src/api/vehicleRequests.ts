import axios from 'axios';

const BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles';

export const getMakesForVehicleType = async () => {
	try {
		const response = await axios.get(
			`${BASE_URL}/GetMakesForVehicleType/car?format=json`
		);
		console.log(response.data);

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Axios error:', error.message);
		} else {
			console.error('Unexpected error:', error);
		}
		throw error;
	}
};
