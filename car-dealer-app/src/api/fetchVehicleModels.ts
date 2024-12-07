// src/api/fetchVehicleModels.ts
import axios from 'axios';

export const fetchVehicleModels = async (makeId: string, year: string) => {
	try {
		const response = await axios.get(
			`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
		);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error('Error fetching vehicle models:', error);
		throw error;
	}
};
