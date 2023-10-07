<script lang="ts">
  import FavoriteOutlineIcon from '~icons/material-symbols/favorite-outline';
  import FavoriteIcon from '~icons/material-symbols/favorite';
  import {
    savedStops,
    saveStopToFirestore,
    removeStopFromFirestore,
    type savedStop
  } from '$lib/stores/favorite-stops';
  import type { components } from '../lib/data/bkk-openapi';

  export let stop: components['schemas']['TransitStop'] = {};
  export let references: components['schemas']['TransitReferences'] = {};

  $: saved = $savedStops.some((savedStop) => savedStop.id == stop.id);

  function transfromStopToSavedStop(
    stop: components['schemas']['TransitStop'],
    references: components['schemas']['TransitReferences']
  ): savedStop {
    const routeRefForStop: {
      [key: string]: components['schemas']['TransitRoute'] | undefined;
    } = {};
    stop.routeIds?.forEach((routeId) => {
      routeRefForStop[routeId] = references.routes?.[routeId];
    });
    return { ...stop, routeRef: routeRefForStop };
  }
</script>

<button
  on:click={() => {
    saved
      ? stop.id && removeStopFromFirestore(stop.id)
      : saveStopToFirestore(transfromStopToSavedStop(stop, references));
  }}
  class="p-1 dark:text-slate-100"
>
  {#if saved}
    <FavoriteIcon />
  {:else}
    <FavoriteOutlineIcon />
  {/if}
</button>
