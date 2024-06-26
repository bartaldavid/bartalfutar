<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import { debounceIntervalMs, searchQueryMinimumLength } from '../../lib/data/constants';
  import Stop from '../../components/Stop.svelte';
  import { onMount } from 'svelte';
  import { typed_fetch } from '../api/endpoint-types';
  import type { TStop } from '$lib/types';
  import { page } from '$app/stores';
  import Search from 'lucide-svelte/icons/search';
  import { replaceState } from '$app/navigation';
  import PlaceCard from './PlaceCard.svelte';
  import * as m from '$lib/paraglide/messages.js';
  import { derived as derivedStore, writable } from 'svelte/store';

  let { data } = $props();

  let favorite_ids = $derived(data?.favorites_ids ?? []);

  let searchQuery = $state(data.query);
  // HACK to make tanstack reactive
  const query = writable(data.query);
  $effect(() => {
    query.set(searchQuery);
  });

  let timer: NodeJS.Timeout | undefined = $state();

  // TODO combine these with createQueries
  const stopsQuery = createQuery(
    derivedStore(query, ($query) => ({
      queryKey: ['search', $query],
      queryFn: async () => typed_fetch('/api/stops-for-location', { q: searchQuery }),
      enabled: $query.length > searchQueryMinimumLength,
      initialData: data?.searchData
    }))
  );

  const placesQuery = createQuery(
    derivedStore(query, ($query) => ({
      queryKey: ['search-places', $query],
      queryFn: async () =>
        fetch('/api/places-autocomplete?q=' + searchQuery).then(
          (res) => res.json() as Promise<{ main: string; secondary: string; placeId: string }[]>
        ),
      enabled: $query.length > searchQueryMinimumLength
    }))
  );

  let stopsToDisplay: TStop[] = $derived.by(() => {
    if (data?.query === searchQuery && data.searchData) {
      return data?.searchData ?? [];
    } else {
      return $stopsQuery.data ?? [];
    }
  });

  let inputElement: HTMLInputElement;

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
      placeholder={m.search_placeholder()}
      bind:value={searchQuery}
      oninput={() => {
        debounceFetch();
      }}
      bind:this={inputElement}
      class="flex-1 bg-transparent outline-none"
      name="q"
      id="search"
    />
  </form>

  {#if $placesQuery.isFetched && $placesQuery.data}
    <h2 class="mb-1 text-sm font-medium">{m.places()}</h2>
    <div class="flex flex-col gap-2">
      {#each $placesQuery.data as place}
        <PlaceCard {place} />
      {/each}
    </div>
  {/if}

  {#if stopsToDisplay.length > 0}
    <h2 class="mb-1 mt-4 text-sm font-medium">{m.stops()}</h2>
    <div class="flex flex-col gap-1">
      {#each stopsToDisplay as stop}
        <Stop {stop} saved={!!stop.id && favorite_ids.includes(stop.id)} />
      {/each}
    </div>
  {/if}
</div>
