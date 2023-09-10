<script lang="ts">
  import type { components } from '../data/bkk-openapi';
  import { displayDate, useTransitStopTime } from '../lib/util/date';
  import Countdown from './Countdown.svelte';
  import RouteIcon from './RouteIcon.svelte';
  import VehicleIcons from './VehicleIcons.svelte';

  export let departureGroup: components['schemas']['TransitDepartureGroup'] = {};
  export let references: components['schemas']['OTPTransitReferences'] = {};

  let routeData = references?.routes?.[departureGroup?.routeId ?? ''];
</script>

<div class="flex flex-col gap-1 rounded bg-slate-100 p-4 dark:bg-slate-800 dark:text-slate-50">
  <div class="my-1 flex flex-row items-center gap-1 text-sm">
    <VehicleIcons vehicleType={routeData?.type ?? ''} class="self-center text-lg" />
    <RouteIcon {routeData} />
    <span>{departureGroup.headsign}</span>
  </div>
  <div class="flex gap-2">
    {#if departureGroup.stopTimes}
      {#each departureGroup.stopTimes as stopTime}
        {@const { relevantDate, isDelayed, isRealtime } = useTransitStopTime(stopTime)}
        {#if relevantDate}
          <Countdown countDownToDate={relevantDate} showApostrophe />
        {/if}
      {/each}
    {:else}
      <span class="text-slate-200">No departure in the next 90 minutes</span>
    {/if}
  </div>
</div>
