<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import { displayDate, useTransitStopTime } from '../lib/util/date';
  import { safeFetch } from '$lib/safeFetch';
  import { tripDetailsUrl } from '../lib/data/api-links';
  import type { components } from '../lib/data/bkk-openapi';
  import { get } from 'svelte/store';

  export let tripId: string;

  $: tripData = createQuery({
    queryKey: ['trip', tripId],
    queryFn: async () =>
      await safeFetch<components['schemas']['TripDetailsOTPMethodResponse']>(
        tripDetailsUrl({ tripId })
      )
  });
</script>

{#if $tripData.data?.data?.entry?.stopTimes?.length}
  <div class="mt-2 flex flex-col text-sm">
    {#each $tripData.data?.data?.entry?.stopTimes as stopTime}
      {@const { isDeparted, relevantDate } = useTransitStopTime(stopTime)}
      <div class="flex flex-row gap-2" class:text-gray-500={get(isDeparted)}>
        <span>
          {displayDate(relevantDate)}
        </span>
        <span>
          {stopTime.stopId
            ? $tripData?.data?.data?.references?.stops?.[stopTime?.stopId]?.name
            : ''}
        </span>
      </div>
    {/each}
  </div>
{/if}
