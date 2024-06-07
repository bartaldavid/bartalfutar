<script lang="ts">
  import { now } from '$lib/stores/now';
  import type { DepartureType } from '$lib/types';
  import Departure from './Departure.svelte';
  import EarlierDepartures from './EarlierDepartures.svelte';

  let {
    departures = [],
    expandable = false
  }: { departures?: DepartureType[]; expandable?: boolean } = $props();

  let expandedTripId = $state<string>('');
  let alreadyDeparted = $state<DepartureType[]>([]);

  now.subscribe((now) => {
    alreadyDeparted = departures.filter(
      (departure) =>
        departure.predictedDepartureTime && departure.predictedDepartureTime * 1000 < now.valueOf()
    );
  });
</script>

<EarlierDepartures departures={alreadyDeparted} />

{#each departures.filter((d) => !alreadyDeparted.includes(d)) as departure}
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
  <div class="flex flex-col items-center justify-center w-full h-12">
    <!-- FIXME 90 should be a variable grabbed from the request -->
    <span class="dark:text-gray-200 text-slate-600">No departure in the next 90 minutes</span>
  </div>
{/each}
