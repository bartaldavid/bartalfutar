<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import { debounceIntervalMs, searchQueryMinimumLength } from '../../data/constants';
  import Stop from '../../components/Stop.svelte';
  import { safeFetch } from '$lib/safeFetch';
  import { stopsForLocationUrl } from '../../data/api-links';
  import type { components } from '../../data/bkk-openapi';
  import ArrowBackIcon from '~icons/material-symbols/arrow-back';
  import { type savedStop, savedStops } from '$lib/stores/favorite-stops';

  let searchQuery: string = '';
  let timer: NodeJS.Timeout;
  let stopsToDisplay: savedStop[];

  $: stopsToDisplay =
    (searchQuery.length <= searchQueryMinimumLength ? $savedStops : $searchData.data?.data?.list) ??
    [];

  const searchData = createQuery({
    queryKey: ['search', searchQuery],
    queryFn: async () =>
      await safeFetch<components['schemas']['StopsForLocationResponse']>(
        stopsForLocationUrl({ query: searchQuery })
      ),
    enabled: false
  });

  function debounceFetch() {
    clearTimeout(timer);
    if (searchQuery.length > searchQueryMinimumLength) {
      timer = setTimeout(() => $searchData.refetch(), debounceIntervalMs);
    }
  }
</script>

<div class="m-1 mt-4 flex w-full flex-col sm:w-72">
  <div class="mb-2 flex flex-row rounded bg-slate-200 p-2 dark:bg-slate-700">
    <a href="/" class="w-6 pr-2"
      ><ArrowBackIcon class="align-middle pr-2 dark:text-slate-100 text-2xl" /></a
    >
    <input
      type="text"
      placeholder="Search for stops"
      bind:value={searchQuery}
      on:keyup={() => {
        debounceFetch();
      }}
      autofocus
      class="flex-1 bg-slate-200 outline-none dark:bg-slate-700 dark:text-slate-100"
    />
    <!-- FIXME this should only be a loading indicator -->
    <button on:click={async () => await $searchData.refetch()} class="dark:text-slate-100"
      >{$searchData.isFetching ? 'Loading...' : 'Search'}</button
    >
  </div>

  <div class="flex flex-col gap-1">
    {#each stopsToDisplay as stop}
      <Stop references={$searchData.data?.data?.references} {stop} />
    {/each}
  </div>
</div>
