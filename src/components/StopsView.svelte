<script lang="ts">
  import type { StopGroup } from '$lib/types';
  import SavedStopGroup from './SavedStopGroup.svelte';
  import GondolaLift from '~icons/material-symbols/gondola-lift';
  import * as m from '$lib/paraglide/messages.js';

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
          {m.the_stops_you_save_will_appear_here()}
        </div>
        <p class="font-light text-center mt-4">{m.sign_in_to_get_started()}</p>
      </div>
    {/each}
  {/if}
</div>
