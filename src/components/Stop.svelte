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
  import { Badge } from '$lib/components/ui/badge';

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

<div class="flex flex-row rounded bg-slate-50 p-2 dark:border-none dark:bg-slate-800">
  <div
    class="flex flex-1 cursor-pointer flex-col gap-1 focus:outline-2"
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
    <div class="mb-1 font-medium dark:text-slate-50">{stop.name}</div>
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
        <!-- <div class="flex items-center gap-1 rounded-lg border bg-slate-100 px-1 dark:bg-slate-600"> -->
        <!-- <MultipleStop class="inline-flex h-4 w-4 dark:text-white" /> -->
        <!-- <Badge variant="outline">stop area</Badge> -->
        <span class=" rounded border px-1 text-sm font-medium text-slate-800 dark:text-slate-50"
          >stop area</span
        >
        <!-- </div> -->
      {/if}
    </div>
  </div>
  <div class="flex flex-col self-center">
    <FavoriteToggle stopId={stop.id} {saved} />
  </div>
</div>

<!-- TODO loading indicator -->

{#if expanded}
  <div class="flex flex-col gap-1 rounded border bg-none p-1 dark:bg-slate-700">
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
