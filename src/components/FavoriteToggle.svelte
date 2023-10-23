<script lang="ts">
  import FavoriteOutlineIcon from '~icons/material-symbols/favorite-outline';
  import FavoriteIcon from '~icons/material-symbols/favorite';
  import { enhance } from '$app/forms';

  export let stopId: string;
  let saved = false;
</script>

<form action="/stops" use:enhance method="post">
  <input type="hidden" value={stopId} name="stopId" />
  <input type="hidden" value={saved} name="saved" />
  <button type="submit" class="p-2 dark:text-slate-100">
    {#if saved}<FavoriteIcon />{:else}<FavoriteOutlineIcon />
    {/if}
  </button>
</form>
