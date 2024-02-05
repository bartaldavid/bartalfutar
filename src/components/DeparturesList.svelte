<script lang="ts">
  import type { DepartureType } from '$lib/types';
  import Departure from './Departure.svelte';

  export let departures: DepartureType[] = [];
  export let expandable = false;

  let expandedTripId = '';
</script>

{#each departures as departure}
  <Departure
    {departure}
    {expandedTripId}
    {expandable}
    on:collapse={() => {
      expandedTripId = '';
    }}
    on:expand={(event) => {
      expandedTripId = event.detail.id;
    }}
  />
{:else}
  <div class="flex flex-col items-center justify-center w-full h-12">
    <!-- FIXME 90 should be a variable grabbed from the request -->
    <span class="text-gray-200">No departure in the next 90 minutes</span>
  </div>
{/each}
