<script lang="ts">
	import { signOut } from 'firebase/auth';
	import { user } from '../util/client/stores';
	import { auth, elevateAnonToGoogle } from '../util/client/firebase';
</script>

<header
	class="flex h-10 flex-row items-center gap-2 bg-slate-100 px-3 text-slate-800 dark:bg-slate-700 dark:text-slate-100"
>
	<span class="flex-1 text-xl">BartalFUTÁR</span>
	<span class="material-symbols-outlined text-xl dark:text-white"> account_circle </span>
	{#if $user?.displayName}
		<span>{$user.displayName}</span>
	{/if}
	{#if $user?.isAnonymous || !$user}
		<button on:click={() => elevateAnonToGoogle()}>Sign in with Google</button>
	{:else}
		<button on:click={() => signOut(auth)}>Sign out</button>
	{/if}
	<!-- <button on:click={() => getUserFromIndexedDB()}>Log user from ls</button> -->
</header>
