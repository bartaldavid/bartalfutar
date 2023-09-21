<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Autorenew from '~icons/material-symbols/autorenew';
  import Refresh from '~icons/material-symbols/refresh';
  export let isFetching: boolean = false;

  const dispatch = createEventDispatcher();
</script>

<button class="px-2" on:click={() => dispatch('refresh')} aria-label="Refresh">
  {#if isFetching}
    <Autorenew />
  {:else}
    <Refresh />
  {/if}
</button>
