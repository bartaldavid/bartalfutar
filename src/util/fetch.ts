import { stopDataUrl, stopsForLocationUrl, tripDataUrl } from '../data/api-links';
import type { components } from '../data/bkk-openapi';
import {
	defaultStopParams,
	defaultStopsForLocationParams,
	defaultTripParams
} from '../data/defaultParams';

// TODO secure api key somehow?
import { PUBLIC_BKK_API_KEY } from '$env/static/public';

// TODO refractor these to remove repetition

export async function fetchStopDepartures(stopId: string, limit?: number) {
	const params = { ...defaultStopParams, stopId: stopId, limit: limit ?? 10 };
	const response = await fetch(
		stopDataUrl + new URLSearchParams({ key: PUBLIC_BKK_API_KEY, ...params } as any)
	);
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
export async function fetchStopsForQuery(searchQuery: string) {
	const params = { ...defaultStopsForLocationParams, query: searchQuery };
	const response = await fetch(
		stopsForLocationUrl + new URLSearchParams({ key: PUBLIC_BKK_API_KEY, ...params } as any)
	);
	const data: components['schemas']['StopsForLocationResponse'] = await response.json();
	return data.data;
}
