export function useNow() {
  let now = $state(new Date());
  setInterval(() => (now = new Date()), 1000);

  return {
    get now() {
      return now;
    }
  };
}
