<script lang="ts">
  import type { components } from '../lib/data/bkk-openapi';

  import SavedStopGroup from './SavedStopGroup.svelte';

  export let stops: components['schemas']['TransitStop'][] = [];

  type savedStopGroup = {
    [key in components['schemas']['TransitStop']['type'] as string]: components['schemas']['TransitStop'][];
  };

  let savedStopGroups: savedStopGroup = {};

  $: savedStopGroups = stops.reduce((result, currentStop) => {
    if (currentStop.type) {
      (result[currentStop.type] = result[currentStop.type] || []).push(currentStop);
    } else if (currentStop.locationType === 1) {
      (result['MULTIPLE'] = result['MULTIPLE'] || []).push(currentStop);
    }
    return result;
  }, {} as savedStopGroup);
</script>

<div class="flex w-full flex-col gap-1 sm:w-72">
  {#each Object.entries(savedStopGroups) as [groupType, groupItems]}
    <SavedStopGroup {groupType} {groupItems} />
  {/each}
</div>
