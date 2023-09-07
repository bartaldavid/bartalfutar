import { PUBLIC_BKK_API_KEY } from '$env/static/public';
import type { operations } from './bkk-openapi';
import {
  defaultStopParams,
  defaultStopsForLocationParams,
  defaultTripParams
} from './defaultParams';

// TODO support "mobile" dialect?
export const BASE_PATH = 'https://futar.bkk.hu/api/query/v1/ws/otp/api/where';

export function arrivalsAndDeparturesForStopUrl(
  query: operations['getArrivalsAndDeparturesForStop']['parameters']['query']
) {
  const params = { key: PUBLIC_BKK_API_KEY, ...defaultStopParams, ...query };
  const queryString = new URLSearchParams(params as any).toString();
  return `${BASE_PATH}/arrivals-and-departures-for-stop.json?${queryString}`;
}

export function tripDetailsUrl(query: operations['getTripDetails']['parameters']['query']) {
  const params = { key: PUBLIC_BKK_API_KEY, ...defaultTripParams, ...query };
  const queryString = new URLSearchParams(params as any).toString();
  return `${BASE_PATH}/trip-details.json?${queryString}`;
}

export function stopsForLocationUrl(
  query: operations['getStopsForLocation']['parameters']['query']
) {
  const params = { key: PUBLIC_BKK_API_KEY, ...defaultStopsForLocationParams, ...query };
  const queryString = new URLSearchParams(params as any).toString();
  return `${BASE_PATH}/stops-for-location.json?${queryString}`;
}

export function nearbyDeparturesUrl(
  query: operations['getArrivalsAndDeparturesForLocation']['parameters']['query']
) {
  const params = { key: PUBLIC_BKK_API_KEY, ...query };
  const queryString = new URLSearchParams(params as any).toString();
  return `${BASE_PATH}/arrivals-and-departures-for-location?${queryString}`;
}
