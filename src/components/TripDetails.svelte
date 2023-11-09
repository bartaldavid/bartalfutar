<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import { displayDate, epochToDate, useTransitStopTime } from '../lib/util/date';
  import { get } from 'svelte/store';
  import { typed_fetch } from '../routes/api/endpoint-types';
  import { now } from '$lib/stores/now';

  export let tripId: string;

  $: tripData = createQuery({
    queryKey: ['trip', tripId],
    queryFn: async () => await typed_fetch('/api/trip-details', { tripId: tripId })
  });
</script>

{#if $tripData.data?.length}
  <div class="mt-2 flex flex-col text-sm">
    {#each $tripData.data as stopTime}
      {@const isDeparted =
        !!stopTime.relevantStopTime && stopTime?.relevantStopTime < $now.getTime()}
      <!-- FIXME this is currently a hacky way to retrieve the isDeparted store -->
      <div class="flex flex-row gap-2" class:text-gray-500={isDeparted}>
        <span>
          {displayDate(epochToDate(stopTime?.relevantStopTime))}
        </span>
        <span>
          {stopTime.stopName}
        </span>
      </div>
    {/each}
  </div>
{/if}
