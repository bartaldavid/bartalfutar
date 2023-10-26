import { arrivalsAndDeparturesForStopUrl } from '../../../lib/data/api-links';
import type { components } from '../../../lib/data/bkk-openapi';

export const load = async ({ parent, fetch, params, data }) => {
  const { queryClient } = await parent();

  await queryClient.prefetchQuery<
    components['schemas']['ArrivalsAndDeparturesForStopOTPMethodResponse']
  >({
    queryKey: ['stop', params.stopId],
    queryFn: async () =>
      (await fetch(arrivalsAndDeparturesForStopUrl({ stopId: [params.stopId] }))).json(),
    structuralSharing: false
  });

  return data;
};
