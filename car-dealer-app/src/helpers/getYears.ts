export const getYears = (): number[] => {
	const currentYear = new Date().getFullYear();
	const years = [];
	for (let year = 2015; year <= currentYear; year++) {
		years.push(year);
	}
	return years;
};
