import type { RequestEvent } from '@sveltejs/kit';

// we're not using the event parameter is this example,
// hence the eslint-disable rule
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createContext(event: RequestEvent) {
  return {
    // context information
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
