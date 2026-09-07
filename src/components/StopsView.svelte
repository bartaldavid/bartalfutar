<script lang="ts">
  import type { StopGroup } from '$lib/types';
  import SavedStopGroup from './SavedStopGroup.svelte';
  import GondolaLift from '~icons/material-symbols/gondola-lift';
  import { m } from '$lib/paraglide/messages.js';
  import { Button } from '$lib/components/ui/button';
  import { signIn } from '@auth/sveltekit/client';

  let { groups }: { groups: StopGroup } = $props();
</script>

<div class="flex w-full flex-col gap-1 divide-y-2 sm:w-72">
  {#if groups}
    {#each Object.entries(groups) as [groupType, groupItems]}
      <SavedStopGroup {groupType} {groupItems} />
    {:else}
      <div class="w-full">
        <div
          class="mx-auto mt-4 flex w-fit flex-col items-center gap-4 rounded border p-8 text-slate-700 dark:border-slate-200 dark:text-slate-200"
        >
          <GondolaLift class="mx-auto h-24 w-24 self-center" />
          <div class="text-center text-lg font-semibold text-balance">
            {m.the_stops_you_save_will_appear_here()}
          </div>
          <p class="text-center font-light">{m.sign_in_to_get_started()}</p>
          <Button
            onclick={() => signIn('google')}
            data-sveltekit-preload-data="off">{m.sign_in()}</Button
          >
        </div>
      </div>
    {/each}
  {/if}
</div>
