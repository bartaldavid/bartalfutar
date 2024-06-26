<script lang="ts">
  import Countdown from './Countdown.svelte';
  import TripDetails from './TripDetails.svelte';
  import { displayDate, useTransitStopTime } from '../lib/util/date.svelte';
  import RouteIcon from './RouteIcon.svelte';
  import type { DepartureType } from '$lib/types';
  import TrainTrack from 'lucide-svelte/icons/train-track';
  import * as m from '$lib/paraglide/messages.js';

  let {
    expanded,
    departure,
    expandable,
    onexpand,
    oncollapse
  }: {
    expanded: boolean;
    departure: DepartureType;
    expandable: boolean;
    onexpand: (id: string) => void;
    oncollapse: () => void;
  } = $props();

  let {
    departureDate,
    predictedDepartureDate,
    delayInMinutes,
    relevantDate,
    isRealtime,
    isDelayed,
    isDeparted
  } = $derived(useTransitStopTime(departure));
</script>

<button
  class="flex w-full flex-col rounded bg-slate-100 p-4 hover:cursor-pointer dark:bg-slate-800 dark:text-slate-50"
  onclick={() => expandable && (expanded ? oncollapse() : onexpand(departure.id))}
  tabindex="0"
>
  <div class="flex w-full justify-between gap-2">
    <div class="flex flex-col gap-1">
      <div class="flex items-baseline gap-1">
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
        {#if departure.platform}
          <span class="inline-flex items-baseline rounded px-0.5 text-sm"
            ><TrainTrack size={14} class="-rotate-45" />{departure.platform}</span
          >
        {/if}
      </div>

      <div class="flex flex-row items-baseline gap-1 text-left">
        {#if departure.icon}
          <RouteIcon icon={departure.icon} />
          <span class="text-start">{departure.headSign}</span>
        {/if}
      </div>

      {#if departure.alerts?.length}
        {#each departure.alerts ?? [] as alert}
          <div class="text-left text-sm text-red-400">
            {@html alert}
          </div>
        {/each}
      {/if}
    </div>

    <!-- TODO improve this display -->
    {#if relevantDate}
      <div class="flex shrink-0 flex-col justify-center text-center">
        <Countdown countDownToDate={relevantDate} class="font-medium" />
        <span class="text-sm text-slate-700 dark:text-slate-100">{m.minutes_from_now()}</span>
      </div>
    {/if}

    <!-- TODO show icon to indicate expandable behaviour -->
  </div>

  {#if expanded}
    <TripDetails tripId={departure.id} />
  {/if}
</button>
