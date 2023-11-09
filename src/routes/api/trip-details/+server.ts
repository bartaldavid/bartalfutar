import { futarClient } from '$lib/server/futar.js';
import type { TripDetails } from '$lib/types.js';
import { typed_json, type TypedResponse } from '$lib/util/fetch.js';
import { z } from 'zod';

export const _params = z.object({
  tripId: z.string().optional()
});

export async function GET({ fetch, url }): Promise<TypedResponse<TripDetails>> {
  const query = _params.parse({
    tripId: url.searchParams.get('tripId')
  });

  const api = futarClient(fetch);

  const { data } = await api.get('/{dialect}/api/where/trip-details', {
    query
  });

  const details: TripDetails =
    data?.entry?.stopTimes?.map((stop) => {
      if (!stop.stopId) return { id: '' };
      return {
        id: stop.stopId,
        stopName: data.references?.stops?.[stop.stopId]?.name,
        relevantStopTime:
          stop.predictedDepartureTime ??
          stop.predictedArrivalTime ??
          stop.departureTime ??
          stop.arrivalTime ??
          undefined
      };
    }) ?? [];

  return typed_json(details);
}
