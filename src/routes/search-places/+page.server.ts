import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
  const query = url.searchParams.get('q') ?? '';
  return { query };
}) satisfies PageServerLoad;
