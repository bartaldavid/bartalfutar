<script lang="ts">
  import type { components } from '../data/bkk-openapi';

  import { createQuery } from '@tanstack/svelte-query';
  import DeparturesList from './DeparturesList.svelte';

  import { safeFetch } from '$lib/safeFetch';
  import { arrivalsAndDeparturesForStopUrl } from '../data/api-links';

  import ChevronRight from '~icons/material-symbols/chevron-right';
  import ArrowUpward from '~icons/material-symbols/arrow-upward';
  import MultipleStop from '~icons/material-symbols/zoom-out-map';
  import FavoriteIcon from '~icons/material-symbols/favorite';
  import FavoriteOutlineIcon from '~icons/material-symbols/favorite-outline'

  import {type  savedStop, savedStops, saveStopToFirestore, removeStopFromFirestore } from '$lib/stores/favorite-stops';
  import { page } from '$app/stores';

  export let references: components['schemas']['TransitReferences'] = {};
  export let stop: savedStop = {};
  $: saved = $savedStops.some((savedStop) => savedStop.id == stop.id);
  let expanded = false;

  function toggleStopSave() {
    if (!saved) {
      let routeRefForStop: {
        [key: string]: components['schemas']['TransitRoute'] | undefined;
      } = {};
      stop.routeIds?.forEach((routeId) => {
        routeRefForStop[routeId] = references.routes?.[routeId];
      });
      saveStopToFirestore({ ...stop, routeRef: routeRefForStop });
    } else {
      stop.id && removeStopFromFirestore(stop.id);
    }
  }

  const departuresFromStop = createQuery({
    queryKey: ['stop', stop.id!],
    queryFn: async () =>
      await safeFetch<components['schemas']['ArrivalsAndDeparturesForStopOTPMethodResponse']>(
        arrivalsAndDeparturesForStopUrl({ stopId: [stop.id!], limit: 3 })
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
        {@const routeRef = stop?.routeRef?.[routeid] ?? references?.routes?.[routeid]}
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
  <div class="flex w-8 flex-col self-center p-1">
    <!-- TODO extract this into FavoriteToggle? -->
    <button on:click={() => toggleStopSave()}>
      {#if saved}<FavoriteIcon class="dark:text-slate-100" />{:else}<FavoriteOutlineIcon
          class="dark:text-slate-100"
        />{/if}
    </button>
  </div>
</div>
{#if $departuresFromStop.isFetched && expanded}
  <div class="flex flex-col gap-1 rounded bg-none p-1 dark:bg-slate-700">
    <DeparturesList
      references={$departuresFromStop?.data?.data?.references}
      departures={$departuresFromStop?.data?.data?.entry?.stopTimes}
      expandable={false}
    />
    <a class="flex items-center justify-center p-2 dark:text-slate-50" href={`/stops/${stop.id}?from=${encodeURIComponent($page.url.pathname)}`}
      >Show more <ChevronRight /></a
    >
  </div>
{/if}
