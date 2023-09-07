<script lang="ts">
  import FavoriteOutlineIcon from '~icons/material-symbols/favorite-outline';
  import FavoriteIcon from '~icons/material-symbols/favorite';
  import {
    savedStops,
    saveStopToFirestore,
    removeStopFromFirestore
  } from '$lib/stores/favorite-stops';
  import type { components } from '../data/bkk-openapi';
  import { createEventDispatcher } from 'svelte';

  export let stopId: string;

  $: saved = $savedStops.some((savedStop) => savedStop.id == stopId);

  const dispatch = createEventDispatcher<{ save: string; remove: string }>();

  async function toggleStopSave() {
    if (!saved) {
      dispatch('save', stopId);
      //   let routeRefForStop: {
      //     [key: string]: components['schemas']['TransitRoute'] | undefined;
      //   } = {};
      //   stop.routeIds?.forEach((routeId) => {
      //     routeRefForStop[routeId] = references.routes?.[routeId];
      //   });
      //   await saveStopToFirestore({ ...stop, routeRef: routeRefForStop });
    } else {
      dispatch('remove', stopId);
      //   stop.id && removeStopFromFirestore(stop.id);
    }
  }
</script>

<button on:click={() => toggleStopSave()}>
  {#if saved}<FavoriteIcon class="dark:text-slate-100" />{:else}<FavoriteOutlineIcon
      class="dark:text-slate-100"
    />
  {/if}
</button>
