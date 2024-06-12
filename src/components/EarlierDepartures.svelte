<script lang="ts">
  import type { DepartureType } from '$lib/types';
  import { useTransitStopTime } from '$lib/util/date.svelte';
  import Countdown from './Countdown.svelte';
  import RouteIcon from './RouteIcon.svelte';

  let { departures = [] }: { departures: DepartureType[] } = $props();
</script>

{#if departures.length > 0}
  <div
    class="flex flex-wrap gap-2 rounded bg-slate-100 p-4 opacity-60 dark:bg-slate-800 dark:text-slate-50"
  >
    {#each departures as departure}
      {@const { relevantDate } = useTransitStopTime(departure)}
      <div class="flex items-baseline gap-1 text-sm">
        <RouteIcon icon={departure.icon} />
        {#if relevantDate}
          <Countdown countDownToDate={relevantDate} />
        {/if}
      </div>
    {/each}
  </div>
{/if}
