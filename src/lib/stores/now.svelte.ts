export function useNow() {
  let now = $state(new Date());

  $effect(() => {
    const interval = setInterval(() => (now = new Date()), 1000);

    return () => clearInterval(interval);
  });

  return {
    get now() {
      return now;
    }
  };
}
