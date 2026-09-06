import type { DepartureType } from '$lib/types.js';
import { typed_json, type TypedResponse } from '$lib/util/fetch.js';
import { z } from 'zod';
import { getQueryFromParams } from '../endpoint-types.js';
import type { MavRoot } from '$lib/data/mav-spec.js';
import { isMav } from '$lib/util/stops.js';
import { futarClient } from '$lib/server/futar.js';

export const _params = z.object({
  stopId: z.array(z.string()),
  limit: z.number().optional(),
  minutesBefore: z.number().optional(),
  minutesAfter: z.number().optional(),
});

export async function GET({ fetch, url }): Promise<
  TypedResponse<{
    departures: DepartureType[];
    stops: { id: string; name?: string }[];
    source: string;
  }>
> {
  const query = _params.parse(getQueryFromParams(url.searchParams));

  const { data } = await futarClient.GET(
    '/{dialect}/api/where/arrivals-and-departures-for-stop',
    {
      params: { query, path: { dialect: 'otp' } },
    },
  );

  const departures: DepartureType[] =
    data?.data?.entry?.stopTimes?.map((departure) => {
      if (!departure.tripId) return { id: 'No tripId, bad response' };
      const routeId =
        data?.data?.references?.trips?.[departure.tripId]?.routeId;
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
          (alertId) =>
            data?.data?.references?.alerts?.[alertId].description
              ?.someTranslation ?? '',
        ),
        icon: {
          color: data?.data?.references?.routes?.[routeId]?.color,
          text: data?.data?.references?.routes?.[routeId]?.shortName,
          textColor: data?.data?.references?.routes?.[routeId]?.textColor,
        },
      };
    }) ?? [];

  const stops = data?.data?.entry?.stopId
    ? [
        {
          id: data?.data?.entry.stopId,
          name: data?.data?.references?.stops?.[data?.data?.entry.stopId]?.name,
        },
      ]
    : [];

  return typed_json({
    departures,
    stops,
    source: 'BKK',
  });
}

// async function fetchMav(
//   {
//     stationId,
//     minCount,
//     maxCount,
//   }: {
//     stationId: string;
//     minCount: number;
//     maxCount: number;
//   },
//   fetch = window.fetch,
// ) {
//   return (await fetch(
//     'https://jegy-a.mav.hu/IK_API_PROD/api/InformationApi/GetTimetable',
//     {
//       body: JSON.stringify({
//         type: 'StationInfo',
//         travelDate: new Date().toISOString(),
//         stationNumberCode: stationId,
//         minCount: minCount.toString(),
//         maxCount: maxCount.toString(),
//       }),
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json; charset=UTF-8',
//         language: 'hu',
//         UserSessionId: crypto.randomUUID(),
//       },
//     },
//   ).then((res) => res.json())) as MavRoot;
// }
