import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './routes';
import type { QueryClient } from '@tanstack/svelte-query';
import { svelteQueryWrapper } from 'trpc-svelte-query-adapter';
//     👆 **type-only** import
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:5173/trpc'
    })
  ]
});

export function trpc(queryClient?: QueryClient) {
  return svelteQueryWrapper<AppRouter>({
    client,
    queryClient
  });
}
