<script lang="ts">
	import { onMount } from 'svelte';
	import type { components } from '../data/bkk-openapi';
	import { savedStops, user } from '../data/stores';
	import migrate from '../util/migrateToFirebase';
	import { auth } from '../util/firebaseSetup';
	import { signInAnonymously } from 'firebase/auth';
	import StopsView from '../components/StopsView.svelte';

	let departures: components['schemas']['TransitScheduleStopTime'][] = [];


</script>

<div
	class="ml-1 mr-1 mt-4 flex w-full flex-col {$savedStops.length === 0 && departures.length === 0
		? 'justify-center'
		: ''} gap-2 sm:w-72"
>
	<StopsView />

	<div
		class="flex gap-2 rounded bg-slate-50 p-2 dark:bg-slate-800 {$savedStops.length === 0 &&
		departures.length === 0
			? 'w-52 self-center'
			: ''}"
	>
		<a
			class="button-outline bg-white dark:border-none dark:bg-slate-700 dark:text-white"
			href="/search"
			><span class="material-symbols-outlined align-bottom text-base"> add </span><span>
				Add stop</span
			>
		</a>

		<!-- {#if $savedStops.length > 0}
            <DeleteAllStopsBtn />
          {/if} -->
	</div>
</div>

<style>
	.button-outline {
		@apply flex-1 rounded border p-2;
	}
</style>
