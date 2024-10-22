import { z } from 'zod';
import type { RequestHandler } from './$types';
import { getQueryFromParams } from '../endpoint-types';
import { futarClient } from '$lib/server/futar';
import { typed_json, type TypedResponse } from '$lib/util/fetch';
import type { RouteIcon } from '$lib/types';
import { error } from '@sveltejs/kit';

export const _params = z.object({
  from_name: z.string().optional(),
  from: z.string(),
  to_name: z.string().optional(),
  to: z.string(),
  arrive_by: z.boolean().optional().default(false),
  time: z.string().optional(),
});

export async function GET({ url }): Promise<TypedResponse<Directions>> {
  const query = _params.parse(getQueryFromParams(url.searchParams));

  const {
    data,
    response,
    error: fetchError,
  } = await futarClient.GET('/{dialect}/api/where/plan-trip', {
    params: {
      query: {
        fromPlace: `${query.from_name ?? 'Your location'}::${query.from}`,
        toPlace: `${query.to_name ?? 'Destination'}::${query.to}`,
        mode: ['TRANSIT', 'WALK'],
        showIntermediateStops: true,
        date: new Date().toISOString().slice(0, 10),
        time:
          query.time ??
          new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'Europe/Budapest',
          }),
        arriveBy: query.arrive_by,
      },
      path: {
        dialect: 'otp',
      },
    },
  });

  if (fetchError) error(500, fetchError);

  return typed_json({
    itineraries: data?.data?.entry?.plan?.itineraries?.map((i) => ({
      duration: i.duration && Math.round(i.duration / 60),
      walkTime: i.walkTime && Math.round(i.walkTime / 60),
      start: i.startTime && new Date(i.startTime).toISOString(),
      end: i.endTime && new Date(i.endTime).toISOString(),
      freqency: i.patternFrequency?.text,
      legs:
        i.legs?.map((l) => ({
          mode: l.mode,
          startTime: l.startTime && new Date(l.startTime).toISOString(),
          endTime: l.endTime && new Date(l.endTime).toISOString(),
          from: l.from?.name,
          to: l.to?.name,
          headsign: l.headsign || undefined,
          route: l.routeShortName
            ? {
                text: l.routeShortName || undefined,
                color: l.routeColor || undefined,
                textColor: l.routeTextColor || undefined,
              }
            : undefined,
          distance: l.distance ? Math.round(l.distance) : 0,
          duration: l.duration ? Math.round(l.duration / 60000) : 0,
          intermediateStops: l.intermediateStops?.length,
        })) ?? [],
    })),
  } satisfies Directions);
}

export type Directions = {
  itineraries?: {
    duration?: number;
    walkTime?: number;
    start?: string;
    end?: string;
    freqency?: string;
    legs: {
      mode?: string;
      startTime?: string;
      endTime?: string;
      from?: string;
      to?: string;
      headsign?: string;
      route?: {
        text?: string;
        color?: string;
        textColor?: string;
      };
      distance: number;
      duration: number;
      intermediateStops?: number;
    }[];
  }[];
};
