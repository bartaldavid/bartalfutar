<script lang="ts">
  import FavoriteOutlineIcon from '~icons/material-symbols/favorite-outline';
  import FavoriteIcon from '~icons/material-symbols/favorite';
  import { enhance } from '$app/forms';

  export let stopId: string;
  export let saved = false;
  let loading = false;
</script>

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
  <button type="submit" class="p-2 dark:text-slate-100" disabled={loading}>
    {#if saved}<FavoriteIcon />{:else}<FavoriteOutlineIcon />
    {/if}
  </button>
</form>
