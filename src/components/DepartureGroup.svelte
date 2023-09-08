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
  <div class="flex flex-row text-sm my-1 items-center gap-1">
    <VehicleIcons vehicleType={routeData?.type ?? ''} class="self-center text-lg"/>
    <RouteIcon {routeData} />
    <span>{departureGroup.headsign}</span>
  </div>
  <div class="flex gap-1 text-sm">
    {#if departureGroup.stopTimes}
      {#each departureGroup.stopTimes as stopTime}
        {@const { relevantDate, isDelayed, isRealtime } = useTransitStopTime(stopTime)}
        <!-- <span>{stopTime.stopId}</span> -->
        <span class:text-red-500={isDelayed} class:text-green-500={isRealtime && !isDelayed}
          >{displayDate(relevantDate)}</span
        >
        <!-- {#if relevantDate}
          <Countdown countDownToDate={relevantDate} />
        {/if} -->
      {/each}
    {:else}
      <span class="text-slate-200">No departure in the next 90 minutes</span>
    {/if}
  </div>
</div>
