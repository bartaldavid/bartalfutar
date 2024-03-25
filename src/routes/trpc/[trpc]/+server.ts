import { createContext } from '$lib/trpc/context';
import { appRouter } from '$lib/trpc/routes';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

export async function fallback(event) {
  return fetchRequestHandler({
    req: event.request,
    router: appRouter,
    createContext: () => createContext(event),
    endpoint: '/trpc',
  });
}
