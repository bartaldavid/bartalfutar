import { futarClient } from '$lib/server/futar.js';
import type { DepartureType } from '$lib/types.js';
import { typed_json, type TypedResponse } from '$lib/util/fetch.js';
import { z } from 'zod';

export const _params = z
  .object({
    stopId: z.string(),
    limit: z.number().optional(),
    minutesBefore: z.number().optional(),
    minutesAfter: z.number().optional()
  })
  .transform((value) => ({ ...value, stopId: value.stopId.split(',') }));

export async function GET({
  fetch,
  url
}): Promise<
  TypedResponse<{ departures: DepartureType[]; stops: { id: string; name?: string }[] }>
> {
  const params = {
    stopId: url.searchParams.get('stopId'),
    limit: url.searchParams.get('limit'),
    minutesBefore: url.searchParams.get('minutesBefore'),
    minutesAfter: url.searchParams.get('minutesAfter')
  };

  const query = _params.parse({
    stopId: params.stopId,
    ...(params.limit && { limit: +params.limit }),
    ...(params.minutesBefore && { minutesBefore: +params.minutesBefore }),
    ...(params.minutesAfter && { minutesAfter: +params.minutesAfter })
  });

  console.log(query);

  const api = futarClient(fetch);

  const { data } = await api.get('/{dialect}/api/where/arrivals-and-departures-for-stop', {
    query
  });

  const departures: DepartureType[] =
    data?.entry?.stopTimes?.map((departure) => {
      if (!departure.tripId) return { id: 'No tripId, bad response' };
      const routeId = data.references?.trips?.[departure.tripId]?.routeId;
      if (!routeId) return { id: 'No routeId, bad response' };
      return {
        id: departure.tripId,
        arrivalTime: departure.arrivalTime,
        departureTime: departure.departureTime,
        predictedArrivalTime: departure.predictedArrivalTime,
        predictedDepartureTime: departure.predictedDepartureTime,
        headSign: departure.stopHeadsign,
        alerts: departure.alertIds?.map(
          // TODO alerts could be translated into EN / HU
          (alertId) => data.references?.alerts?.[alertId].description?.someTranslation ?? ''
        ),
        icon: {
          color: data.references?.routes?.[routeId]?.color,
          text: data.references?.routes?.[routeId]?.shortName,
          textColor: data.references?.routes?.[routeId]?.textColor
        }
      };
    }) ?? [];

  const stops = query.stopId.map((id) => ({
    id,
    name: data?.references?.stops?.[id]?.name,
    type: data?.references?.stops?.[id]?.type
  }));

  return typed_json({
    departures,
    stops
  });
}
