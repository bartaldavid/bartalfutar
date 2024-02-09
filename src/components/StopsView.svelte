<script lang="ts">
  import type { StopGroup } from '$lib/types';
  import SavedStopGroup from './SavedStopGroup.svelte';

  export let groups: StopGroup;
</script>

<div class="flex w-full flex-col gap-1 sm:w-72">
  {#each Object.entries(groups) as [groupType, groupItems]}
    <SavedStopGroup {groupType} {groupItems} />
  {:else}
    <span class="self-center mt-6 text-slate-700 dark:text-slate-200"
      >Stops you save will appear here</span
    >
  {/each}
</div>
