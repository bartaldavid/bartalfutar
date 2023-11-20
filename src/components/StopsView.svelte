<script lang="ts">
  import type { StopGroup } from '$lib/types';
  import SavedStopGroup from './SavedStopGroup.svelte';

  export let groups: StopGroup;
</script>

<div class="flex w-full flex-col gap-1 sm:w-72">
  {#each Object.entries(groups) as [groupType, groupItems]}
    <SavedStopGroup {groupType} {groupItems} />
  {/each}
</div>
