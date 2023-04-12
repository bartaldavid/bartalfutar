<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import DeparturesList from '../../../components/DeparturesList.svelte';
	import { fetchStopDepartures } from '../../../util/fetch';
	import type { PageData } from './$types';
	import { REFETCH_INTERVAL_MS } from '../../../data/constants';
	import { onDestroy } from 'svelte';

	export let data: PageData;
	const stopData = createQuery({
		queryKey: ['stop', data.stopId],
		refetchInterval: REFETCH_INTERVAL_MS,
		queryFn: async () => await fetchStopDepartures(data.stopId)
		// enabled: false
	});

	stopData.subscribe((data) => console.log(data));

	onDestroy(() => console.log('destroyed'));
</script>

<div class="flex h-screen w-full flex-col gap-2 pr-4 pt-4 sm:w-72 sm:overflow-auto">
	<div class="flex items-center gap-2">
		<button
			class="button-outline dark:text-slate-100"
			on:click={async () => await $stopData.refetch()}
			><span class="material-symbols-outlined pr-1 align-bottom text-base">
				refresh
			</span>{$stopData.isLoading ? 'Loading...' : 'Refresh'}
		</button>
		<a href="/" class="button-outline dark:text-slate-100">Clear</a>
	</div>
	<DeparturesList
		departures={$stopData.data?.entry?.stopTimes}
		references={$stopData.data?.references}
	/>
</div>
