import { readable } from 'svelte/store';

export const now = readable(new Date(), (set) => {
  const interval = setInterval(() => {
    set(new Date());
  }, 1000);

  return () => {
    clearInterval(interval);
  };
});

export function useNow() {
  let now = $state(new Date());
  setInterval(() => (now = new Date()), 1000);

  return {
    get now() {
      return now;
    }
  };
}
