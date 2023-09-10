<script lang="ts">
  import type { components } from '../lib/data/bkk-openapi';

  import Countdown from './Countdown.svelte';
  import TripDetails from './TripDetails.svelte';
  import { displayDate, useTransitStopTime } from '../lib/util/date';
  import { createEventDispatcher, onMount } from 'svelte';
  import RouteIcon from './RouteIcon.svelte';

  export let departure: components['schemas']['TransitScheduleStopTime'] = {};
  export let references: components['schemas']['OTPTransitReferences'] = {};
  export let expandedTripId: string;
  export let expandable: boolean;

  const dispatch = createEventDispatcher();

  const routeId = references?.trips?.[departure?.tripId!]?.routeId;
  const routeData = references?.routes?.[routeId!];

  $: ({
    departureDate,
    predictedDepartureDate,
    delayInMinutes,
    relevantDate,
    isRealtime,
    isDelayed,
    isDeparted
  } = useTransitStopTime(departure));

  async function toggleDetails() {
    if (departure.tripId && expandedTripId !== departure.tripId + departure.stopId) {
      dispatch('expand', { id: departure.tripId + departure.stopId });
    } else {
      dispatch('collapse');
    }
  }
</script>

<div
  class="flex w-full flex-col rounded bg-slate-100 p-4 hover:cursor-pointer dark:bg-slate-800 dark:text-slate-50 {isDeparted &&
    'text-xs opacity-70'}"
  on:click={() => expandable && toggleDetails()}
  on:keypress={() => {}}
  role="button"
  tabindex="0"
>
  <div class="flex justify-between gap-6">
    <div>
      {#if !isDeparted}
        {#if isDelayed || !isRealtime}
          <span class="">{displayDate(departureDate)}</span>
        {/if}
        {#if isRealtime}
          <span
            class={delayInMinutes >= 1
              ? 'text-red-500 dark:text-red-400'
              : 'text-green-600 dark:text-green-400'}
          >
            {displayDate(predictedDepartureDate)}
          </span>
          {#if isDelayed}
            <span class="text-xs text-red-500 dark:text-red-400"
              >(+{delayInMinutes.toFixed(0)})</span
            >
          {/if}
        {/if}
      {/if}

      {#if routeData}
        <div class="my-1 text-sm">
          <RouteIcon {routeData} />
          <span>{departure.stopHeadsign}</span>
        </div>
      {/if}

      {#if departure.alertIds && !isDeparted}
        {#each departure.alertIds as alertId}
          <div class="mt-2 text-xs text-red-500 dark:text-red-400">
            {references?.alerts?.[alertId]?.header?.someTranslation}
          </div>
        {/each}
      {/if}
    </div>

    {#if relevantDate}
      <div class="flex flex-col justify-center text-center">
        <Countdown countDownToDate={relevantDate} />
        <span class="text-xs text-slate-700 dark:text-slate-100">perc múlva</span>
      </div>
    {/if}

    <!-- TODO show icon to indicate expandable behaviour -->
  </div>

  {#if departure.tripId && expandedTripId === departure.tripId + departure.stopId}
    <TripDetails tripId={departure.tripId} />
  {/if}
</div>
