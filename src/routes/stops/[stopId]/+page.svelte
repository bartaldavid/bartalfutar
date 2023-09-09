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
  import PageLayout from '../../../components/PageLayout.svelte';
  import { page } from '$app/stores';
  import RefreshButton from '../../../components/RefreshButton.svelte';

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
  // TODO extract this to a global store maybe?
  $: parent = $page.url.searchParams.get('from');
</script>

<svelte:head>
  <title>{stopName}</title>
</svelte:head>

<PageLayout pageTitle={stopName ?? "Loading..."}>
  <svelte:fragment slot="header">
    <div class="flex gap-1 dark:text-slate-100">
      <RefreshButton isFetching={$stopData.isFetching} on:refresh={async () => await $stopData.refetch()}/>
      <a href={parent ?? "/"} class="px-2"><Close /></a>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <div class="flex flex-col gap-2"> 
      {#if !$stopData.isLoading && $stopData.isFetched}
      <DeparturesList
        departures={$stopData.data?.data?.entry?.stopTimes}
        references={$stopData.data?.data?.references}
        expandable={true}
      />
    {:else if $stopData.isError}
      <div class="text-red-500">{$stopData.error}</div>
    {/if}
    </div>
  </svelte:fragment>
</PageLayout>
