<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import { debounceIntervalMs, searchQueryMinimumLength } from '../../lib/data/constants';
  import Stop from '../../components/Stop.svelte';
  import { safeFetch } from '$lib/safeFetch';
  import { stopsForLocationUrl } from '../../lib/data/api-links';
  import type { components } from '../../lib/data/bkk-openapi';
  import { type savedStop, savedStops } from '$lib/stores/favorite-stops';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  // export let form;
  export let data;

  let searchQuery = data?.query?.toString() ?? '';
  let timer: NodeJS.Timeout;
  let stopsToDisplay: savedStop[] = [];
  let inputElement: HTMLInputElement;

  const searchData = createQuery({
    queryKey: ['search', searchQuery],
    queryFn: async () =>
      await safeFetch<components['schemas']['StopsForLocationResponse']>(
        stopsForLocationUrl({ query: searchQuery })
      ),
    enabled: false,
    initialData: data?.searchData
  });

  function debounceFetch() {
    clearTimeout(timer);

    $page.url.searchParams.set('q', searchQuery);
    history.replaceState(history.state, '', $page.url);

    if (searchQuery.length > searchQueryMinimumLength) {
      timer = setTimeout(() => $searchData.refetch(), debounceIntervalMs);
    }
  }

  onMount(() => {
    inputElement.focus();
  });

  $: isServerDataUpToDate = data?.query === searchQuery;

  // FIXME refractor this
  $: stopsToDisplay =
    (searchQuery.length <= searchQueryMinimumLength
      ? $savedStops
      : isServerDataUpToDate
      ? data.searchData?.data?.list
      : $searchData.data?.data?.list) ?? [];

  $: references =
    isServerDataUpToDate && data?.searchData?.data?.references
      ? data.searchData.data.references
      : $searchData.data?.data?.references ?? {};
</script>

<div class="m-1 mt-4 flex w-full flex-col sm:w-72">
  <form
    class="mb-2 flex flex-row rounded bg-slate-200 p-2 dark:bg-slate-700"
    data-sveltekit-keepfocus
  >
    <input
      type="text"
      placeholder="Search for stops"
      bind:value={searchQuery}
      on:keyup={() => {
        debounceFetch();
      }}
      bind:this={inputElement}
      class="flex-1 bg-slate-200 outline-none dark:bg-slate-700 dark:text-slate-100"
      name="q"
    />
    <button class="dark:text-slate-100" type="submit"
      >{$searchData.isFetching ? 'Loading...' : 'Search'}</button
    >
  </form>

  {#if stopsToDisplay}
    <div class="flex flex-col gap-1">
      {#each stopsToDisplay as stop}
        <Stop {references} {stop} />
      {/each}
    </div>
  {/if}
</div>
