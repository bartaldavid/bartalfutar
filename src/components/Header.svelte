<script lang="ts">
  import { getContext } from 'svelte';
  import type { serverData, serverUserData } from '../routes/+layout.server';
  import { elevateAnonToGoogle, signUserOut, user } from '../util/client/firebase';

  const serverdata = getContext<serverData>('serverdata');
  // FIXME this falls back to anonymous after signing out
  const name = serverdata?.user?.name ?? $user?.displayName ?? 'Anonymous';
</script>

<header
  class="flex h-10 flex-row items-center gap-2 bg-slate-100 px-3 text-slate-800 dark:bg-slate-700 dark:text-slate-100"
>
  <span class="flex-1 text-xl">BartalFUTÁR</span>
  <span class="material-symbols-outlined text-xl dark:text-white"> account_circle </span>
  <span>{name}</span>
  {#if $user?.isAnonymous || !serverdata?.user?.name}
    <button on:click={() => elevateAnonToGoogle()}>Sign in with Google</button>
  {/if}
  {#if $user || serverdata?.signedIn}
    <button on:click={() => signUserOut()}>Sign out</button>
  {/if}
</header>
