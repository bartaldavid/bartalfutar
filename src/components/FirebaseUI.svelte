<script lang="ts">
	import { user, userInfo } from '../util/client/stores';
	import { elevateAnonToGoogle, signUserOut } from '../util/client/firebase';

	const name = $userInfo?.name ?? $user?.displayName ?? 'Anonymous';

	console.log($user);
</script>

<header
	class="flex h-10 flex-row items-center gap-2 bg-slate-100 px-3 text-slate-800 dark:bg-slate-700 dark:text-slate-100"
>
	<span class="flex-1 text-xl">BartalFUTÁR</span>
	<span class="material-symbols-outlined text-xl dark:text-white"> account_circle </span>
	<span>{name}</span>
	{#if $user?.isAnonymous}
		<button on:click={() => elevateAnonToGoogle()}>Sign in with Google</button>
	{/if}
	{#if $user}
		<button on:click={() => signUserOut()}>Sign out</button>
	{/if}
	<!-- <span>{$user?.uid ?? $userInfo.uid}</span> -->
</header>
