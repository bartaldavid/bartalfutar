import { arrivalsAndDeparturesForStopUrl } from '../../../data/api-links';
import type { components } from '../../../data/bkk-openapi';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch, params }) => {
  const { queryClient } = await parent();

  // You need to use the SvelteKit fetch function here
  await queryClient.prefetchQuery<
    components['schemas']['ArrivalsAndDeparturesForStopOTPMethodResponse']
  >({
    queryKey: ['stop', params.stopId],
    queryFn: async () =>
      (await fetch(arrivalsAndDeparturesForStopUrl({ stopId: [params.stopId] }))).json(),
    cacheTime: 0,
    structuralSharing: false
  });

  return { stopId: params.stopId };
};
