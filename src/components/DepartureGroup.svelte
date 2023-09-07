<script lang="ts">
  import type { components } from '../data/bkk-openapi';
  import { displayDate, useTransitStopTime } from '../lib/util/date';
  import RouteIcon from './RouteIcon.svelte';
  import VehicleIcons from './VehicleIcons.svelte';

  export let departureGroup: components['schemas']['TransitDepartureGroup'] = {};
  export let references: components['schemas']['OTPTransitReferences'] = {};

  let routeData = references?.routes?.[departureGroup?.routeId ?? ''];
</script>

<div class="flex flex-col gap-1 rounded bg-slate-100 p-4 dark:bg-slate-800 dark:text-slate-50">
  <RouteIcon {routeData} headSign={departureGroup.headsign} />
  <div class="flex gap-1 text-sm">
    <VehicleIcons vehicleType={routeData?.type ?? ''} />
    {#if departureGroup.stopTimes}
      {#each departureGroup.stopTimes as stopTime}
        {@const { relevantDate, isDelayed, isRealtime } = useTransitStopTime(stopTime)}
        <!-- <span>{stopTime.stopId}</span> -->
        <span class:text-red-500={isDelayed} class:text-green-500={isRealtime && !isDelayed}
          >{displayDate(relevantDate)}</span
        >
      {/each}
    {:else}
      <span class="text-slate-200">No departure in the next 90 minutes</span>
    {/if}
  </div>
</div>
