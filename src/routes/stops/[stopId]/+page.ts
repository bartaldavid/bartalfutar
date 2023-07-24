import { arrivalsAndDeparturesForStopUrl } from '../../../data/api-links';
import type { components } from '../../../data/bkk-openapi';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
  try {
    const response = await fetch(arrivalsAndDeparturesForStopUrl({ stopId: [params.stopId] }));

    if (!response.ok) {
      throw new Error(`Network response was not OK: ${response.statusText}`);
    }

    const departures =
      (await response.json()) as components['schemas']['ArrivalsAndDeparturesForStopOTPMethodResponse'];

    return {
      stopId: params.stopId,
      departures
    };
  } catch (error) {
    console.error(error);
    return {
      stopId: params.stopId,
      departures: [] as components['schemas']['ArrivalsAndDeparturesForStopOTPMethodResponse']
    };
  }
}) satisfies PageLoad;
