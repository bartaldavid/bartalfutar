<script lang="ts">
	import { app, elevateAnonToGoogle } from '../util/client/firebase';
	import { user, userInfo } from '../util/client/firebase';

	async function anonymousLogin() {
		const { signInAnonymously, getAuth } = await import('firebase/auth');
		signInAnonymously(getAuth(app));
	}
</script>

{#if !$user && !$userInfo.uid}
	<div class="flex flex-col gap-4">
		<div class="p-4 mb-4 mt-4 text-center text-4xl dark:text-slate-50">BartalFUTÁR</div>
		<button on:click={elevateAnonToGoogle} class="text-white bg-slate-700 rounded p-2"
			>Sign in with Google</button
		>
		<button on:click={anonymousLogin} class="text-gray-400 text-sm"
			>Continue without signing in</button
		>
	</div>
{/if}
