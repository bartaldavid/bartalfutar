<script lang="ts">
  import { get } from 'svelte/store';
  import { auth, elevateAnonToGoogle, user } from '../../util/client/firebase';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  async function anonymousLogin() {
    const { signInAnonymously } = await import('firebase/auth');
    signInAnonymously(auth);
  }

  onMount(() => {
    if (get(user)) {
      goto('/');
    }
  });
</script>

<div class="flex flex-col gap-4">
  <div class="p-4 mb-4 mt-4 text-center text-4xl dark:text-slate-50">BartalFUTÁR</div>
  <button on:click={elevateAnonToGoogle} class="text-white bg-slate-700 rounded p-2"
    >Sign in with Google</button
  >
  <button on:click={anonymousLogin} class="text-gray-400 text-sm"
    >Continue without signing in</button
  >
</div>
