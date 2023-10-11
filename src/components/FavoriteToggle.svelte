<script lang="ts">
  import FavoriteOutlineIcon from '~icons/material-symbols/favorite-outline';
  import FavoriteIcon from '~icons/material-symbols/favorite';
  import { enhance } from '$app/forms';
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  export let stopId: string;

  const favorite_stops_ids = getContext<Writable<string[]>>('favoriteStops');
  $: saved = $favorite_stops_ids.includes(stopId);
</script>

<form action="/stops" use:enhance method="post">
  <input type="hidden" value={stopId} name="stopId" />
  <input type="hidden" value={saved} name="saved" />
  <button type="submit" class="p-2 dark:text-slate-100">
    {#if saved}<FavoriteIcon />{:else}<FavoriteOutlineIcon />
    {/if}
  </button>
</form>
