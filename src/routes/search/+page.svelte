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
  import PlaceCard from './PlaceCard.svelte';

  let { data } = $props();

  let favorite_ids = $derived(data?.favorites_ids ?? []);

  let searchQuery = $state(data.query);
  let timer: NodeJS.Timeout | undefined = $state();
  let stopsToDisplay: TStop[] = $derived.by(() => {
    if (data?.query === searchQuery && data.searchData) {
      return data?.searchData ?? [];
    } else {
      return $stopsQuery.data ?? [];
    }
  });
  let inputElement: HTMLInputElement;

  let stopsQuery = createQuery({
    queryKey: ['search', searchQuery],
    queryFn: async () => typed_fetch('/api/stops-for-location', { q: searchQuery }),
    enabled: searchQuery.length > searchQueryMinimumLength,
    initialData: data?.searchData
  });

  let placesQuery = createQuery({
    queryKey: ['search', Date.now()],
    queryFn: async () =>
      fetch('/api/places-autocomplete?q=' + searchQuery).then(
        (res) => res.json() as Promise<{ main: string; secondary: string; placeId: string }[]>
      ),
    enabled: searchQuery.length > searchQueryMinimumLength
  });

  function debounceFetch() {
    clearTimeout(timer);

    $page.url.searchParams.set('q', searchQuery);
    replaceState($page.url, history.state);

    if (searchQuery.length > searchQueryMinimumLength) {
      timer = setTimeout(() => {
        $stopsQuery.refetch();
        $placesQuery.refetch();
      }, debounceIntervalMs);
    }
  }

  onMount(() => {
    inputElement.focus();
  });
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
      onkeyup={() => {
        debounceFetch();
      }}
      bind:this={inputElement}
      class="flex-1 bg-transparent outline-none"
      name="q"
      id="search"
    />
  </form>

  {#if $placesQuery.isFetched && $placesQuery.data}
    <h2 class="mb-1 text-sm font-medium">Places</h2>
    <div class="flex flex-col gap-2">
      {#each $placesQuery.data as place}
        <PlaceCard {place} />
      {/each}
    </div>
  {/if}

  {#if stopsToDisplay.length > 0}
    <h2 class="mb-1 mt-4 text-sm font-medium">Stops</h2>
    <div class="flex flex-col gap-1">
      {#each stopsToDisplay as stop}
        <Stop {stop} saved={!!stop.id && favorite_ids.includes(stop.id)} />
      {/each}
    </div>
  {/if}
</div>
