<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import DeparturesList from '../../../components/DeparturesList.svelte';
	import { fetchStopDepartures } from '../../../util/fetch';
	import type { PageData } from './$types';
	import { REFETCH_INTERVAL_MS } from '../../../data/constants';
	import { onDestroy, onMount } from 'svelte';

	export let data: PageData;
	$: stopData = createQuery({
		queryKey: ['stop', data.stopId],
		refetchInterval: REFETCH_INTERVAL_MS,
		queryFn: async () => await fetchStopDepartures(data.stopId)
		// enabled: false
	});
</script>

<div class="flex h-screen w-full flex-col gap-2 pr-4 pt-4 sm:w-72 sm:overflow-auto">
	<div class="flex items-center gap-2 text-center">
		<button
			class="flex-1 rounded p-2 dark:text-slate-100"
			on:click={async () => await $stopData.refetch()}
			><span class="material-symbols-outlined pr-1 align-bottom text-base">
				refresh
			</span>{$stopData.isFetching ? 'Loading...' : 'Refresh'}
		</button>
		<a href="/" class="flex-1 rounded p-2 dark:text-slate-100">Clear</a>
	</div>
	{#if $stopData.isFetched}
		<DeparturesList
			departures={$stopData.data?.entry?.stopTimes}
			references={$stopData.data?.references}
			expandable={true}
		/>
	{/if}
</div>
