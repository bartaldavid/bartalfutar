import { typed_fetch } from '../../api/endpoint-types';

export const load = async ({ parent, fetch, params, data }) => {
  const { queryClient } = await parent();

  await queryClient.prefetchQuery({
    queryKey: ['stop', params.stopId],
    queryFn: async () =>
      await typed_fetch('/api/departures-for-stop', { stopId: [params.stopId] }, fetch)
  });

  return data;
};
