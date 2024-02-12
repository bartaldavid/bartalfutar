<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { createEventDispatcher } from 'svelte';
  import Autorenew from '~icons/material-symbols/autorenew';
  import Refresh from '~icons/material-symbols/refresh';
  export let isFetching: boolean = false;

  const dispatch = createEventDispatcher();
</script>

<Button size="icon" variant="ghost" on:click={() => dispatch('refresh')}>
  {#if isFetching}
    <Autorenew />
  {:else}
    <Refresh />
  {/if}
</Button>
