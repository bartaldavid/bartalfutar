<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query';
  import DeparturesList from './DeparturesList.svelte';

  import ChevronRight from '~icons/material-symbols/chevron-right';
  import ArrowUpward from '~icons/material-symbols/arrow-upward';
  import MultipleStop from '~icons/material-symbols/zoom-out-map';

  import { page } from '$app/stores';
  import FavoriteToggle from './FavoriteToggle.svelte';
  import { typed_fetch } from '../routes/api/endpoint-types';
  import type { TStop } from '$lib/types';
  import RouteIcon from './RouteIcon.svelte';
  import { REFETCH_INTERVAL_MS } from '$lib/data/constants';
  import LoadingCards from './LoadingCards.svelte';

  export let stop: TStop;
  export let saved = false;
  let expanded = false;

  const departuresFromStop = createQuery({
    queryKey: ['stop', stop.id!, 3],
    queryFn: async () =>
      await typed_fetch('/api/departures-for-stop', {
        stopId: [stop.id!],
        limit: 3,
        minutesBefore: 0
      }),
    enabled: false,
    refetchInterval: REFETCH_INTERVAL_MS
  });
</script>

<div class="flex flex-row rounded border p-1 dark:border-none dark:bg-slate-800 dark:p-2">
  <div
    class="flex-1 cursor-pointer focus:outline-2"
    on:click={() => {
      expanded = !expanded;
      $departuresFromStop.refetch();
    }}
    role="button"
    tabindex={0}
    on:keydown={(e) => {
      if (e.key == 'Enter') expanded = !expanded;
      $departuresFromStop.refetch();
    }}
  >
    <div class="flex-row">
      <div class="mb-1 dark:text-slate-50">{stop.name}</div>
    </div>
    <div class="flex flex-row flex-wrap gap-1">
      {#each stop?.routes ?? [] as route}
        <RouteIcon icon={route} size="small" />
      {/each}

      {#if stop.direction}
        <span class="h-3 w-3 align-middle"
          ><ArrowUpward
            class="dark:text-slate-50"
            style="transform: rotate({stop.direction + 'deg'});"
          /></span
        >
      {/if}
      {#if stop.locationType === 1}
        <MultipleStop class="inline-flex p-1 dark:text-white" />
      {/if}
    </div>
  </div>
  {#if stop.id}
    <div class="flex flex-col self-center p-1">
      <FavoriteToggle stopId={stop.id} {saved} />
    </div>
  {/if}
</div>

<!-- TODO loading indicator -->

{#if expanded}
  <div class="flex flex-col gap-1 rounded bg-none p-1 dark:bg-slate-700">
    {#if $departuresFromStop.isPending}
      <LoadingCards numberOfItems={3} />
    {/if}
    {#if $departuresFromStop.isFetched}
      <DeparturesList departures={$departuresFromStop?.data?.departures} expandable={false} />
    {/if}
    <a
      class="flex items-center justify-center p-2 dark:text-slate-50"
      href={`/stops/${stop.id}?from=${encodeURIComponent($page.url.pathname)}`}
      >Show more <ChevronRight /></a
    >
  </div>
{/if}
