<script lang="ts">
  import { getContext } from 'svelte';
  import type { serverData } from '../routes/+layout.server';
  import { elevateAnonToGoogle, signUserOut, user } from '../util/client/firebase';
  import AccountCircle from "~icons/material-symbols/account-circle";

  const serverdata = getContext<serverData>('serverdata');
  // FIXME this falls back to anonymous after signing out
  $: name = serverdata?.user?.name ?? $user?.displayName ?? 'Anonymous';

  $: profile_image_url = serverdata.user?.photoUrl ?? $user?.photoURL; 
</script>

<header
  class="flex h-10 flex-row items-center gap-2 bg-slate-100 px-3 text-slate-800 dark:bg-slate-700 dark:text-slate-100"
>
  <span class="flex-1 text-xl">BartalFUTÁR</span>
  {#if profile_image_url}
    <img src={profile_image_url} alt="Profile picture" height="20" width="20"  class="rounded-full">
  {:else if $user}
    <AccountCircle />
  {/if}
  <span>{name}</span>
  {#if $user?.isAnonymous}
    <button on:click={() => elevateAnonToGoogle()}>Sign in with Google</button>
  {/if}
  {#if $user || serverdata?.signedIn}
    <button on:click={() => signUserOut()}>Sign out</button>
  {/if}
</header>
