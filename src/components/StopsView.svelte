<script lang="ts">
  import type { components } from "../data/bkk-openapi";
  import { type savedStop, savedStops } from "../data/stores";
  import SavedStopGroup from "./SavedStopGroup.svelte";

  type savedStopGroup = {
    [key in components["schemas"]["TransitStop"]["type"] as string]: savedStop[];
  };

  let savedStopGroups: savedStopGroup;

  $: savedStopGroups = $savedStops.reduce((result, currentStop) => {
    if (currentStop.type) {
      (result[currentStop.type] = result[currentStop.type] || []).push(
        currentStop
      );
    }
    return result;
  }, {} as savedStopGroup);
</script>

{#each Object.entries(savedStopGroups) as [groupType, groupItems]}
  <SavedStopGroup {groupType} {groupItems} on:stopSelected />
{:else}
  <!-- TODO move this up -->
  <div class="dark:text-slate-50 text-4xl text-center p-4 pb-0">
    BartalFUTÁR
  </div>
  <div class="dark:text-slate-200 text-center pb-10">
    Add stops to get started
  </div>
{/each}
