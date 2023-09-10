<script lang="ts">
  import type { components } from '../lib/data/bkk-openapi';
  import VehicleIcons from './VehicleIcons.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  export let groupType: string;
  export let groupItems: components['schemas']['TransitStop'][];
</script>

<div class="flex flex-row rounded bg-slate-50 p-2 dark:bg-slate-800">
  <div class="flex">
    <VehicleIcons vehicleType={groupType} class="ml-1 self-center pr-3 text-3xl" />
  </div>
  <div class="flex flex-wrap gap-1">
    <!-- TODO separate this into its own stop component? -->
    {#each groupItems as stop (stop.id)}
      <a
        class="flex flex-1 items-center justify-center break-words rounded bg-slate-100 p-2 text-center text-sm dark:bg-slate-700 dark:text-slate-50"
        href={`/stops/${stop.id}?from=${encodeURIComponent($page.url.pathname)}`}
        >{stop.name}
      </a>
    {/each}
  </div>
</div>

<style>
  a {
    -webkit-touch-callout: none;
  }
</style>
