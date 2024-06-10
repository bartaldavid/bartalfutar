<script lang="ts">
  import type { DepartureGroup } from '$lib/types';
  import { cn } from '$lib/utils';
  import { useTransitStopTime } from '../lib/util/date.svelte';
  import Countdown from './Countdown.svelte';
  import RouteIcon from './RouteIcon.svelte';
  import TripDetails from './TripDetails.svelte';

  let { departureGroup }: { departureGroup: DepartureGroup } = $props();

  let expanded = $state(false);
</script>

<button
  class="flex flex-col gap-1 rounded bg-slate-100 p-4 dark:bg-slate-800 dark:text-slate-50"
  onclick={() => {
    expanded = !expanded;
  }}
>
  <div class="my-1 flex flex-row items-center gap-2 text-balance text-start text-sm">
    <!-- <VehicleIcons vehicleType={departureGroup. ?? ''} class="self-center text-lg" /> -->
    <RouteIcon icon={departureGroup.icon} />
    <div>{departureGroup.headSign}</div>
  </div>
  <div class="flex gap-2">
    {#each departureGroup.departures ?? [] as departure}
      {@const { relevantDate, isDelayed } = useTransitStopTime(departure)}
      {#if relevantDate}
        <Countdown
          countDownToDate={relevantDate}
          showApostrophe
          class={cn(isDelayed && 'text-red-600')}
        />
      {/if}
    {:else}
      <span class="text-slate-200">No departure in the next 90 minutes</span>
    {/each}
  </div>
  {#if expanded && departureGroup.departures?.[0].id}
    <TripDetails tripId={departureGroup.departures[0].id} />
  {/if}
</button>
