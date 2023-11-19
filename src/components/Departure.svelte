<script lang="ts">
  import Countdown from './Countdown.svelte';
  import TripDetails from './TripDetails.svelte';
  import { displayDate, useTransitStopTime } from '../lib/util/date';
  import { createEventDispatcher } from 'svelte';
  import RouteIcon from './RouteIcon.svelte';
  import type { DepartureType } from '$lib/types';

  export let departure: DepartureType;
  export let expandedTripId: string;
  export let expandable: boolean;

  const dispatch = createEventDispatcher();

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
    if (departure.id && expandedTripId !== departure.id) {
      dispatch('expand', { id: departure.id });
    } else {
      dispatch('collapse');
    }
  }
</script>

<div
  class="flex w-full flex-col rounded bg-slate-100 p-4 hover:cursor-pointer dark:bg-slate-800 dark:text-slate-50 {$isDeparted &&
    'text-xs opacity-70'}"
  on:click={() => expandable && toggleDetails()}
  on:keypress={() => {}}
  role="button"
  tabindex="0"
>
  <div class="flex justify-between gap-6">
    <div>
      {#if !$isDeparted}
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

      <div class="my-1 flex items-baseline gap-1 text-sm">
        {#if departure.icon}
          <RouteIcon icon={departure.icon} />
          <span>{departure.headSign}</span>
        {/if}
        {#if departure.platform}
          <span class="text-sm text-slate-700 dark:text-slate-100">
            || {departure.platform}
          </span>
        {/if}
      </div>

      {#if departure.alerts?.length && !$isDeparted}
        {#each departure.alerts ?? [] as alert}
          <div class="text-sm text-red-400">
            {@html alert}
          </div>
        {/each}
      {/if}
    </div>

    {#if relevantDate}
      <div class="flex flex-col justify-center text-center">
        <Countdown countDownToDate={relevantDate} />
        {#if !$isDeparted}
          <span class="text-xs text-slate-700 dark:text-slate-100">perc múlva</span>
        {/if}
      </div>
    {/if}

    <!-- TODO show icon to indicate expandable behaviour -->
  </div>

  {#if departure.id && expandedTripId === departure.id}
    <TripDetails tripId={departure.id} />
  {/if}
</div>
