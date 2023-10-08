import { stopsForLocationUrl } from '$lib/data/api-links.js';
import type { components } from '$lib/data/bkk-openapi';

export async function load({ fetch, url }) {
  const query = url.searchParams.get('q')?.toString();

  if (!query || query.length < 3) return { searchData: null, query };

  const data: components['schemas']['StopsForLocationResponse'] = await fetch(
    stopsForLocationUrl({ query })
  ).then((res) => res.json());

  return {
    searchData: data,
    query
  };
}
