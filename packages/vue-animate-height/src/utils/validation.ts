export function isNumber(n: string | number) {
	if (typeof n === 'string') {
		n = Number(n);
	}

	return !Number.isNaN(n) && Number.isFinite(n);
}

export function isPercentage(height: string | number) {
	// Percentage height
	return (
		typeof height === 'string' &&
		height.search('%') === height.length - 1 &&
		isNumber(height.slice(0, Math.max(0, height.length - 1)))
	);
}
