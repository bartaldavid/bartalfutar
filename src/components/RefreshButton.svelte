<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import Autorenew from '~icons/material-symbols/autorenew';
  import Refresh from '~icons/material-symbols/refresh';

  let {
    isFetching,
    onrefresh,
  }: { isFetching: boolean; onrefresh: () => void } = $props();
</script>

<Button size="icon" variant="ghost" onclick={onrefresh}>
  {#if isFetching}
    <Autorenew />
  {:else}
    <Refresh />
  {/if}
</Button>
