<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Autorenew from '~icons/material-symbols/autorenew';
  import Refresh from '~icons/material-symbols/refresh';
  export let isFetching: boolean = false;

  const dispatch = createEventDispatcher();
</script>

<button class="p-1" on:click={() => dispatch('refresh')}>
  {#if isFetching}
    <Autorenew />
  {:else}
    <Refresh />
  {/if}
</button>
