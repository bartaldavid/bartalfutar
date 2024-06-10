<script lang="ts">
  import { formatDuration } from '$lib/util/format';
  import { Accordion } from 'bits-ui';
  import type { Directions } from '../api/directions/+server';
  import LegPreview from './LegPreview.svelte';
  import DirectionsWalk from '~icons/material-symbols/directions-walk';
  import { slide } from 'svelte/transition';
  import RouteIcon from '$components/RouteIcon.svelte';

  let { itinerary }: { itinerary: NonNullable<Directions['itineraries']>[number] } = $props();

  const df = new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
</script>

<Accordion.Item value={crypto.randomUUID()}>
  <Accordion.Header>
    <Accordion.Trigger
      class="flex w-full items-center justify-between rounded p-3 dark:bg-slate-800"
    >
      <div class="flex flex-col items-start gap-1">
        <LegPreview legs={itinerary.legs} />
        {#if itinerary.start && itinerary.end}
          <span>{df.formatRange(new Date(itinerary.start), new Date(itinerary.end))}</span>
        {/if}
        <!-- {#if itinerary.freqency}
        <small>Every {itinerary.freqency} minutes</small>
        {/if} -->
        {#if itinerary.walkTime}
          <div class="flex items-center gap-1 text-sm">
            <DirectionsWalk /><span>{itinerary.walkTime} min</span>
          </div>
        {/if}
      </div>

      {#if itinerary.duration}
        <span class="font-medium">{formatDuration(itinerary.duration)}</span>
      {/if}
    </Accordion.Trigger>
  </Accordion.Header>

  <Accordion.Content
    transition={slide}
    transitionConfig={{ duration: 200 }}
    class="mt-2 flex flex-col gap-8 rounded border p-3 dark:border-slate-400"
  >
    {#each itinerary.legs as leg, i}
      <div class="flex flex-col gap-1">
        <!-- {#if leg.mode !== 'WALK' || itinerary.legs[i - 1]?.to !== leg.from} -->
        <div class="flex gap-2 text-sm">
          {#if leg.startTime}
            <span>{df.format(new Date(leg.startTime))}</span>
          {/if}
          {#if leg.from}
            <span class="font-medium">{leg.from}</span>
          {/if}
        </div>
        <hr />
        <!-- {/if} -->

        {#if leg.mode === 'WALK'}
          <div class="my-2 flex items-center gap-2">
            <DirectionsWalk />
            <span class="font-light">
              {leg.distance} m, {leg.duration} min
            </span>
          </div>
        {/if}

        {#if leg.route}
          <div class="my-2 flex items-center gap-3">
            <RouteIcon icon={leg.route} />
            <div class="flex flex-col items-start">
              <span>{leg.headsign}</span>
              <span class="text-sm font-light"
                >{leg.duration} min, {leg.intermediateStops} stops</span
              >
            </div>
          </div>
        {/if}
        <!-- {#if leg.mode !== 'WALK' || itinerary.legs[i + 1]?.from !== leg.to} -->
        <hr />
        <div class="flex items-baseline gap-2 text-sm">
          {#if leg.endTime}
            <span>{df.format(new Date(leg.endTime))}</span>
          {/if}
          {#if leg.to}
            <span class="font-medium">{leg.to}</span>
          {/if}
        </div>
        <!-- {/if} -->
      </div>
    {/each}
  </Accordion.Content>
</Accordion.Item>
