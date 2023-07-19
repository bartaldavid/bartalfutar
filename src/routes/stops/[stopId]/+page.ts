import { fetchStopDepartures } from '../../../util/fetch';
import type { PageLoad } from './$types';

export const load = ( async ({ params }) => {
	const stopId = params.stopId;

	const departures = await fetchStopDepartures({ stopId: [stopId] })
	
	
	return {
		stopId: params.stopId,
		initialData: departures,
	};
}) satisfies PageLoad;
