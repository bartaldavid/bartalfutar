<script lang="ts">
	import { browser } from '$app/environment';
	import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query';
	import FirebaseUi from '../components/FirebaseUI.svelte';
	import '../app.css';
	import { savedStops } from '../util/client/stores';

	import StopsView from '../components/StopsView.svelte';
	import { initializeFirebase } from '../util/client/firebase';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	onMount(async () => {
		try {
			initializeFirebase();
		} catch (error) {
			console.error(error);
		}
	});

	export let data: LayoutData;
	$savedStops = data.stops;
</script>

<svelte:head>
	<title>BartalFUTÁR</title>
</svelte:head>
<QueryClientProvider client={queryClient}>
	<FirebaseUi />
	<main class="flex flex-row flex-wrap justify-center gap-4">
		<div
			class="ml-1 mr-1 mt-4 flex w-full flex-col {$savedStops.length === 0
				? 'justify-center'
				: ''} gap-2 sm:w-72"
		>
			<StopsView />

			{#if !$savedStops.length}
				<div class="p-4 pb-0 text-center text-4xl dark:text-slate-50">BartalFUTÁR</div>
				<div class="pb-10 text-center dark:text-slate-200">Add stops to get started</div>
			{/if}

			<div
				class="flex gap-2 rounded bg-slate-50 p-2 dark:bg-slate-800 {$savedStops.length === 0
					? 'w-52 self-center'
					: ''}"
			>
				<a
					class="button-outline bg-white text-center dark:border-none dark:bg-slate-700 dark:text-white"
					href="/search"
					><span class="material-symbols-outlined align-bottom text-base"> add </span><span>
						Add stop</span
					>
				</a>
			</div>
		</div>
		<slot />
	</main>
</QueryClientProvider>

<style>
	.button-outline {
		@apply flex-1 rounded border p-2;
	}
</style>
