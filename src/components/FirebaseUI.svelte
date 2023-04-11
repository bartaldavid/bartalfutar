<script lang="ts">
  import {
    GoogleAuthProvider,
    linkWithCredential,
    signInWithPopup,
    signOut,
  } from "firebase/auth";
  import { user } from "../data/stores";
  import { auth } from "../util/firebaseSetup";

  // FIXME not working
  async function elevateAnonToGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if ($user && credential) {
      linkWithCredential($user, credential)
        .then(() => console.log("Elevation success"))
        .catch((error) => console.log("Failure", error));
    }
  }
</script>

<header
  class="flex h-10 flex-row items-center gap-2 bg-slate-100 px-3 text-slate-800 dark:bg-slate-700 dark:text-slate-100"
>
  <span class="flex-1 text-xl ">BartalFUTÁR</span>
  <span class="material-symbols-outlined text-xl dark:text-white">
    account_circle
  </span>
  {#if $user}
    {#if $user.displayName}
      <span>{$user.displayName}</span>
    {/if}
    {#if $user.isAnonymous}
      <button on:click={() => elevateAnonToGoogle()}>Sign in with Google</button
      >
    {:else}
      <button on:click={() => signOut(auth)}>Sign out</button>
    {/if}
    <!-- <button on:click={() => migrate()}>Migrate localstorage data</button> -->
    <!-- {:else}
      <button on:click={() => signInAnonymously(auth)}>Sign in anonymously</button
      > -->
    <span>{$user.uid}</span>
  {/if}
</header>
