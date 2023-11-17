<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import DeparturesList from '../../../components/DeparturesList.svelte';
  import type { PageData, PageServerData } from './$types';
  import { REFETCH_INTERVAL_MS } from '../../../lib/data/constants';
  import Close from '~icons/material-symbols/close';
  import PageLayout from '../../../components/PageLayout.svelte';
  import { page } from '$app/stores';
  import RefreshButton from '../../../components/RefreshButton.svelte';
  import FavoriteToggle from '../../../components/FavoriteToggle.svelte';
  import { typed_fetch } from '../../api/endpoint-types';

  export let data: PageData;

  $: stopData = createQuery({
    queryKey: ['stop', data.stopId],
    refetchInterval: REFETCH_INTERVAL_MS,
    queryFn: async () =>
      await typed_fetch('/api/departures-for-stop', {
        stopId: [data.stopId],
        minutesAfter: 90,
        limit: 30
      })
  });

  // TODO extract this to a global store maybe?
  $: parent = $page.url.searchParams.get('from');

  $: stopName = $stopData.data?.stops?.find((stop) => stop.id === data.stopId)?.name;
</script>

<svelte:head>
  <title>{stopName}</title>
</svelte:head>

<PageLayout pageTitle={stopName ?? 'Loading...'}>
  <svelte:fragment slot="header">
    <div class="flex gap-1 dark:text-slate-200">
      <FavoriteToggle stopId={data.stopId} saved={data.saved} />
      <RefreshButton
        isFetching={$stopData.isFetching}
        on:refresh={async () => await $stopData.refetch()}
      />
      <a href={parent ?? '/'} class="p-2 hover:text-slate-50"><Close /></a>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <div class="flex flex-col gap-2">
      {#if !$stopData.isLoading && $stopData.isFetched}
        <DeparturesList departures={$stopData.data?.departures} expandable={true} />
      {:else if $stopData.isError}
        <div class="text-red-500">{$stopData.error}</div>
      {/if}

      <button on:click={async () => await fetch(`/api/mav?stationId=${data.stopId}`)}
        >Fetch máv</button
      >
    </div>
  </svelte:fragment>
</PageLayout>
