import { useOfetch, type GetResponseType } from '$lib/util/fetch';
import type { z } from 'zod';

interface EndpointMap {
  '/api/nearby-departures': {
    params: z.infer<typeof import('./nearby-departures/+server')._params>;
    response: GetResponseType<
      ReturnType<typeof import('./nearby-departures/+server').GET>
    >;
  };
  '/api/departures-for-stop': {
    params: z.infer<typeof import('./departures-for-stop/+server')._params>;
    response: GetResponseType<
      ReturnType<typeof import('./departures-for-stop/+server').GET>
    >;
  };
  '/api/stops-for-location': {
    params: z.infer<typeof import('./stops-for-location/+server')._params>;
    response: GetResponseType<
      ReturnType<typeof import('./stops-for-location/+server').GET>
    >;
  };
  '/api/trip-details': {
    params: z.infer<typeof import('./trip-details/+server')._params>;
    response: GetResponseType<
      ReturnType<typeof import('./trip-details/+server').GET>
    >;
  };
  '/api/directions': {
    params: z.infer<typeof import('./directions/+server')._params>;
    response: GetResponseType<
      ReturnType<typeof import('./directions/+server').GET>
    >;
  };
}

export async function typed_fetch<
  Path extends keyof EndpointMap,
  TEndpoint extends EndpointMap[Path],
>(path: Path, params: TEndpoint['params'], fetcher?: typeof window.fetch) {
  const $fetch = useOfetch(fetcher);
  return await $fetch<TEndpoint['response']>(path, {
    query: { data: encodeURIComponent(JSON.stringify(params)) },
  });
}

export function getQueryFromParams(params: URLSearchParams) {
  const dataQueryString = params.get('data');
  if (!dataQueryString) return {};
  return JSON.parse(decodeURIComponent(dataQueryString) || '{}');
}
