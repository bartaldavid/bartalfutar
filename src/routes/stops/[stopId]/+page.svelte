<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import DeparturesList from '../../../components/DeparturesList.svelte';
  import type { PageData, PageServerData } from './$types';
  import { REFETCH_INTERVAL_MS } from '../../../data/constants';
  import { safeFetch } from '$lib/safeFetch';
  import { arrivalsAndDeparturesForStopUrl, stopsForLocationUrl } from '../../../data/api-links';
  import type { components } from '../../../data/bkk-openapi';
  import Autorenew from '~icons/material-symbols/autorenew';
  import Refresh from '~icons/material-symbols/refresh';
  import Close from '~icons/material-symbols/close';

  export let data: PageData;

  $: stopData = createQuery({
    queryKey: ['stop', data.stopId],
    refetchInterval: REFETCH_INTERVAL_MS,
    queryFn: async () =>
      await safeFetch<components['schemas']['ArrivalsAndDeparturesForStopOTPMethodResponse']>(
        arrivalsAndDeparturesForStopUrl({ stopId: [data.stopId] })
      )
    // initialData: data?.departures ?? []
    // cacheTime: 0
  });

  $: stopName = $stopData.data?.data?.references?.stops?.[data.stopId]?.name;
</script>

<svelte:head>
  <title>{stopName}</title>
</svelte:head>
<div
  class="flex sm:h-[calc(100vh-2.5rem)] w-full flex-col gap-2 sm:pr-4 pt-4 sm:w-80 sm:overflow-auto"
>
  <div class="flex gap-2 dark:text-slate-100 justify-between pb-2">
    <h1 class="text-lg self-baseline">
      {stopName ?? 'Loading...'}
    </h1>
    <div class="flex items-center">
      <button class="px-2" on:click={async () => await $stopData.refetch()}>
        {#if $stopData.isFetching}
          <Autorenew />
        {:else}
          <Refresh />
        {/if}
      </button>
      <a href="/" class="px-2"><Close /></a>
    </div>
  </div>
  {#if $stopData.isSuccess}
    <DeparturesList
      departures={$stopData.data?.data?.entry?.stopTimes}
      references={$stopData.data?.data?.references}
      expandable={true}
    />
  {:else if $stopData.isError}
    <div class="text-red-500">{$stopData.error}</div>
  {/if}
</div>
