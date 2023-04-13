import type { operations } from './bkk-openapi';

export const defaultStopParams: operations['getArrivalsAndDeparturesForStop']['parameters']['query'] =
	{
		version: '4',
		onlyDepartures: true,
		limit: 10,
		minutesBefore: 1,
		minutesAfter: 90
	};

export const defaultTripParams: operations['getTripDetails']['parameters']['query'] = {
	includeReferences: ['stops'],
	version: '4'
};

export const defaultStopsForLocationParams: operations['getStopsForLocation']['parameters']['query'] =
	{
		lon: 47.452734,
		lat: 19.18329
	};
