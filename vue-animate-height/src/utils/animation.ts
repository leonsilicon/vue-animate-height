// Start animation helper using nested requestAnimationFrames
export function startAnimationHelper(callback: () => void) {
	const requestAnimationFrameIDs = [];

	requestAnimationFrameIDs[0] = requestAnimationFrame(() => {
		requestAnimationFrameIDs[1] = requestAnimationFrame(() => {
			callback();
		});
	});

	return requestAnimationFrameIDs;
}

export function cancelAnimationFrames(requestAnimationFrameIds: number[]) {
	for (const id of requestAnimationFrameIds) cancelAnimationFrame(id);
}
