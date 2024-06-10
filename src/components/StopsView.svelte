<script lang="ts">
  import type { StopGroup } from '$lib/types';
  import SavedStopGroup from './SavedStopGroup.svelte';
  import GondolaLift from '~icons/material-symbols/gondola-lift';

  let { groups }: { groups: StopGroup } = $props();
</script>

<div class="flex w-full flex-col gap-1 divide-y-2 sm:w-72">
  {#if groups}
    {#each Object.entries(groups) as [groupType, groupItems]}
      <SavedStopGroup {groupType} {groupItems} />
    {:else}
      <div
        class="self-center mt-4 text-slate-700 dark:border-slate-200 dark:text-slate-200 border p-8 rounded"
      >
        <GondolaLift class="h-24 w-24 self-center mx-auto" />
        <div class="text-lg font-semibold text-center text-balance mt-4">
          The stops you save will appear here
        </div>
        <p class="font-light text-center mt-4">Sign in to get started</p>
      </div>
    {/each}
  {/if}
</div>
