<script lang="ts">
  import type { components } from '../data/bkk-openapi';
  import type { savedStop } from '../util/client/savedStop';
  import { savedStops } from '../util/client/firebase';
  import SavedStopGroup from './SavedStopGroup.svelte';
  import { getContext } from 'svelte';
  import type { serverData } from '../routes/+layout.server';

  type savedStopGroup = {
    [key in components['schemas']['TransitStop']['type'] as string]: savedStop[];
  };

  let savedStopGroups: savedStopGroup;

  const serverdata = getContext<serverData>('serverdata');

  $: stops = $savedStops.length ? $savedStops : serverdata.stops ?? [];

  $: savedStopGroups = stops.reduce((result, currentStop) => {
    if (currentStop.type) {
      (result[currentStop.type] = result[currentStop.type] || []).push(currentStop);
    }
    return result;
  }, {} as savedStopGroup);
</script>

{#each Object.entries(savedStopGroups) as [groupType, groupItems]}
  <SavedStopGroup {groupType} {groupItems} />
{/each}
