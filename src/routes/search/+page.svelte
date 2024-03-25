<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import { debounceIntervalMs, searchQueryMinimumLength } from '../../lib/data/constants';
  import Stop from '../../components/Stop.svelte';
  import { onMount } from 'svelte';
  import { typed_fetch } from '../api/endpoint-types';
  import type { TStop } from '$lib/types';
  import { page } from '$app/stores';
  import { Search } from 'lucide-svelte';
  import { replaceState } from '$app/navigation';

  export let data;

  $: favorite_ids = data?.favorites_ids ?? [];

  let searchQuery = data?.query?.toString() ?? '';
  let timer: NodeJS.Timeout;
  let stopsToDisplay: TStop[];
  let inputElement: HTMLInputElement;

  const searchData = createQuery({
    queryKey: ['search', searchQuery],
    queryFn: async () => typed_fetch('/api/stops-for-location', { q: searchQuery }),
    enabled: false,
    initialData: data?.searchData
  });

  function debounceFetch() {
    clearTimeout(timer);

    $page.url.searchParams.set('q', searchQuery);
    replaceState($page.url, history.state);

    if (searchQuery.length > searchQueryMinimumLength) {
      timer = setTimeout(() => $searchData.refetch(), debounceIntervalMs);
    }
  }

  onMount(() => {
    inputElement.focus();
  });

  $: if (data?.query === searchQuery && data.searchData) {
    stopsToDisplay = data?.searchData ?? [];
  } else {
    stopsToDisplay = $searchData.data ?? [];
  }
</script>

<div class="m-1 mt-4 flex w-full scroll-mb-80 flex-col sm:w-72 md:mt-12">
  <form
    class="mb-2 flex flex-row items-center gap-1 rounded bg-slate-200 p-3 dark:bg-slate-700 dark:text-slate-100"
  >
    <label for="search">
      <Search size={16} />
    </label>
    <input
      type="search"
      placeholder="Search for stops"
      bind:value={searchQuery}
      on:keyup={() => {
        debounceFetch();
      }}
      bind:this={inputElement}
      class="flex-1 bg-transparent outline-none"
      name="q"
      id="search"
    />
  </form>

  {#if stopsToDisplay}
    <div class="flex flex-col gap-1">
      {#each stopsToDisplay as stop}
        <Stop {stop} saved={!!stop.id && favorite_ids.includes(stop.id)} />
      {/each}
    </div>
  {/if}
</div>
