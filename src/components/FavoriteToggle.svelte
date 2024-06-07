<script lang="ts">
  import FavoriteOutlineIcon from '~icons/material-symbols/favorite-outline';
  import FavoriteIcon from '~icons/material-symbols/favorite';
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/button';

  let { stopId, saved }: { stopId: string; saved?: boolean } = $props();
  let loading = $state(false);
</script>

<!-- TODO show dialog to sign in -->
<form
  use:enhance={() => {
    loading = true;
    const prevState = saved;
    saved = !saved;

    return async ({ result }) => {
      loading = false;
      if (result.type !== 'success') {
        saved = prevState;
      }
    };
  }}
  method="post"
>
  <input type="hidden" value={stopId} name="stopId" />
  <input type="hidden" value={saved} name="saved" />
  <Button type="submit" disabled={loading} variant="ghost" size="icon">
    {#if saved}<FavoriteIcon />{:else}<FavoriteOutlineIcon />
    {/if}
  </Button>
</form>
