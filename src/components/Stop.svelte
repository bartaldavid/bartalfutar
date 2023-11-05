<script lang="ts">
  import type { components } from '../lib/data/bkk-openapi';

  import { createQuery } from '@tanstack/svelte-query';
  import DeparturesList from './DeparturesList.svelte';

  import { safeFetch } from '$lib/safeFetch';
  import { arrivalsAndDeparturesForStopUrl } from '../lib/data/api-links';

  import ChevronRight from '~icons/material-symbols/chevron-right';
  import ArrowUpward from '~icons/material-symbols/arrow-upward';
  import MultipleStop from '~icons/material-symbols/zoom-out-map';

  import { page } from '$app/stores';
  import FavoriteToggle from './FavoriteToggle.svelte';
  import { getContext } from 'svelte';

  export let references: components['schemas']['TransitReferences'] = {};
  export let stop: components['schemas']['TransitStop'] = {};
  export let saved = false;
  let expanded = false;

  const departuresFromStop = createQuery({
    queryKey: ['stop', stop.id!, 3],
    queryFn: async () =>
      await safeFetch<components['schemas']['ArrivalsAndDeparturesForStopOTPMethodResponse']>(
        arrivalsAndDeparturesForStopUrl({
          stopId: [stop.id!],
          limit: 3,
          minutesBefore: 0,
          includeReferences: ['compact'],
          minutesAfter: 20,
          version: '4'
        })
      ),
    enabled: false
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
      {#if stop.locationType === 1}
        <div class="flex items-center gap-1 text-sm dark:text-slate-300">
          <MultipleStop />
        </div>
      {/if}

      {#each stop?.routeIds ?? [] as routeid}
        {@const routeRef = references?.routes?.[routeid]}
        <span
          class="rounded p-1 text-xs"
          style:color={'#' + routeRef?.style?.icon?.textColor}
          style:background-color={'#' + routeRef?.style?.color}
          >{routeRef?.shortName ?? ''}
        </span>
      {/each}

      {#if stop.direction}
        <span class="h-3 w-3 align-middle"
          ><ArrowUpward
            class="dark:text-slate-50"
            style="transform: rotate({stop.direction + 'deg'});"
          /></span
        >
      {/if}
    </div>
  </div>
  {#if stop.id}
    <div class="flex w-8 flex-col self-center p-1">
      <FavoriteToggle stopId={stop.id} {saved} />
    </div>
  {/if}
</div>
<!-- TODO loading indicator -->
<!-- {#if $departuresFromStop.isLoading}
  <div class="text-white">Loading...</div>
{/if} -->

{#if $departuresFromStop.isFetched && expanded}
  <div class="flex flex-col gap-1 rounded bg-none p-1 dark:bg-slate-700">
    <DeparturesList
      references={$departuresFromStop?.data?.data?.references}
      departures={$departuresFromStop?.data?.data?.entry?.stopTimes}
      expandable={false}
    />
    <a
      class="flex items-center justify-center p-2 dark:text-slate-50"
      href={`/stops/${stop.id}?from=${encodeURIComponent($page.url.pathname)}`}
      >Show more <ChevronRight /></a
    >
  </div>
{/if}
