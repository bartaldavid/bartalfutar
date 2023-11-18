import { z } from 'zod';
import { getQueryFromParams } from '../endpoint-types.js';
import { typed_json, type TypedResponse } from '$lib/util/fetch.js';
import type { DepartureType } from '$lib/types.js';

export const _params = z.object({
  stationId: z.string(),
  minCount: z.number().optional(),
  limit: z.number().optional()
});

export async function GET({
  url,
  fetch
}): Promise<TypedResponse<{ departures: DepartureType[]; stops: { id: string; name: string }[] }>> {
  const query = _params.parse(getQueryFromParams(url.searchParams));

  const data = await fetchMav(
    {
      stationId: query.stationId.split('_')[1].replace('CS', ''),
      minCount: query.minCount ?? 0,
      maxCount: query.limit ?? 10
    },
    fetch
  );

  const departures: DepartureType[] = data.stationSchedulerDetails.departureScheduler.map(
    (departure) => {
      return {
        id: departure.code,
        ...(departure.actualOrEstimatedStart && {
          predictedDepartureTime: Date.parse(departure.actualOrEstimatedStart) / 1000
        }),
        ...(departure.actualOrEstimatedArrive && {
          predictedArrivalTime: Date.parse(departure.actualOrEstimatedArrive) / 1000
        }),
        arrivalTime: Date.parse(departure.arrive) / 1000,
        departureTime: Date.parse(departure.start) / 1000,
        alerts: [departure.havarianInfok.kesesiOk ?? departure.havarianInfok.kesesInfo],
        headSign: departure.endStation.name,
        icon: {
          text: departure.viszonylatiJel?.jel ?? departure.fullShortType,
          color: departure.viszonylatiJel?.fontSzinKod,
          textColor: departure.viszonylatiJel?.hatterSzinKod
        }
      };
    }
  );

  const stops = [
    {
      id: `BKK_${data.stationSchedulerDetails.station.code}_0`,
      name: data.stationSchedulerDetails.station.name
    }
  ];

  return typed_json({ departures, stops });
}

import type { MavRoot } from '$lib/data/mav-spec';

async function fetchMav(
  {
    stationId,
    minCount,
    maxCount
  }: {
    stationId: string;
    minCount: number;
    maxCount: number;
  },
  fetch = window.fetch
) {
  return (await fetch('https://jegy-a.mav.hu/IK_API_PROD/api/InformationApi/GetTimetable', {
    body: JSON.stringify({
      type: 'StationInfo',
      travelDate: new Date().toISOString(),
      stationNumberCode: stationId,
      minCount,
      maxCount
    }),
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      language: 'hu'
    }
  }).then((res) => res.json())) as MavRoot;
}
