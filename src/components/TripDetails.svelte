<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import {
    displayDate,
    epochToDate,
    useTransitStopTime,
  } from '../lib/util/date.svelte';
  import { typed_fetch } from '../routes/api/endpoint-types';
  import { useNow } from '$lib/stores/now.svelte';
  import * as m from '$lib/paraglide/messages.js';

  let { tripId }: { tripId: string } = $props();

  const time = useNow();

  let tripData = createQuery(() => ({
    queryKey: ['trip', tripId],
    queryFn: async () =>
      await typed_fetch('/api/trip-details', { tripId: tripId }),
  }));
</script>

{#if tripData.isLoading}
  <span class="text-xs">{m.loading_()}</span>
{/if}

{#if tripData.data?.length}
  <div
    class="mt-2 grid grid-cols-[min-content_minmax(0,1fr)] gap-x-2 text-left text-sm"
  >
    {#each tripData.data as stopTime}
      <span
        class:opacity-60={stopTime?.relevantStopTime &&
          stopTime?.relevantStopTime < time.now.getTime() / 1000}
      >
        {displayDate(epochToDate(stopTime?.relevantStopTime))}
      </span>
      <span
        class:opacity-60={stopTime?.relevantStopTime &&
          stopTime?.relevantStopTime < time.now.getTime() / 1000}
      >
        {stopTime.stopName}
      </span>
    {/each}
  </div>
{/if}
