import { stopDataUrl, stopsForLocationUrl, tripDataUrl } from '../data/api-links';
import type { components, operations } from '../data/bkk-openapi';
import {
	defaultStopParams,
	defaultStopsForLocationParams,
	defaultTripParams
} from '../data/defaultParams';

// TODO secure api key somehow?
import { PUBLIC_BKK_API_KEY } from '$env/static/public';

// TODO refractor these to remove repetition
// TODO throw errors here & catch them in tanstack query
export async function fetchStopDepartures(
	query: operations['getArrivalsAndDeparturesForStop']['parameters']['query']
) {
	const params = { ...defaultStopParams, ...query };
	const response = await fetch(
		stopDataUrl + new URLSearchParams({ key: PUBLIC_BKK_API_KEY, ...params } as any)
	);
	if (!response.ok) throw response.statusText;
	const data: components['schemas']['ArrivalsAndDeparturesForStopOTPMethodResponse'] =
		await response.json();
	return data.data;
}
export async function fetchTripDetails(tripId: string) {
	const params = { ...defaultTripParams, tripId: tripId };
	const response = await fetch(
		tripDataUrl + new URLSearchParams({ key: PUBLIC_BKK_API_KEY, ...params } as any)
	);
	const data: components['schemas']['TripDetailsOTPMethodResponse'] = await response.json();
	return data.data;
}
export async function fetchStopsForQuery(
	options: operations['getStopsForLocation']['parameters']['query']
) {
	const params = { ...defaultStopsForLocationParams, ...options };
	const response = await fetch(
		stopsForLocationUrl + new URLSearchParams({ key: PUBLIC_BKK_API_KEY, ...params } as any)
	);
	const data: components['schemas']['StopsForLocationResponse'] = await response.json();
	return data.data;
}
