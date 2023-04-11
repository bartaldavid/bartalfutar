import type { PageLoad } from './$types';

export const load = (({ params }) => {
	return {
		stopId: params.stopId
	};
}) satisfies PageLoad;
