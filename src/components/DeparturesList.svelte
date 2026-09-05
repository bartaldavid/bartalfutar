<script lang="ts">
  import { useNow } from '$lib/stores/now.svelte';
  import type { DepartureType } from '$lib/types';
  import Departure from './Departure.svelte';
  import EarlierDepartures from './EarlierDepartures.svelte';
  import { m } from '$lib/paraglide/messages.js';

  let {
    departures = [],
    expandable = false,
  }: { departures?: DepartureType[]; expandable?: boolean } = $props();

  let expandedTripId = $state<string>('');

  const time = useNow();

  let alreadyDeparted = $derived(
    departures.filter(
      (departure) =>
        departure.predictedDepartureTime &&
        departure.predictedDepartureTime * 1000 <= time.now.valueOf(),
    ),
  );
  let futureDepartures = $derived(
    departures.filter(
      (d) =>
        (d.departureTime && d.departureTime * 1000 > time.now.valueOf()) ||
        (d.predictedDepartureTime &&
          d.predictedDepartureTime * 1000 > time.now.valueOf()),
    ),
  );

  // $inspect(time.now);
</script>

<EarlierDepartures departures={alreadyDeparted} />

{#each futureDepartures as departure}
  <Departure
    {departure}
    expanded={expandedTripId === departure.id}
    {expandable}
    oncollapse={() => {
      expandedTripId = '';
    }}
    onexpand={(id) => {
      expandedTripId = id;
    }}
  />
{:else}
  <div class="flex h-12 w-full flex-col items-center justify-center">
    <!-- FIXME 90 should be a variable grabbed from the request -->
    <span class="text-slate-600 dark:text-gray-200"
      >{m.no_departures_in_the_next()}</span
    >
  </div>
{/each}
