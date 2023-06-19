<script lang="ts">
	import type { components } from '../data/bkk-openapi';
	import { removeStopFromFirestore, saveStopToFirestore } from '../util/client/manageFbData';
	import { createQuery } from '@tanstack/svelte-query';
	import { fetchStopDepartures } from '../util/fetch';
	import DeparturesList from './DeparturesList.svelte';
	import { savedStops } from '../util/client/stores';
	import type { savedStop } from '../util/client/savedStop';

	export let references: components['schemas']['TransitReferences'] = {};
	export let stop: savedStop = {};
	$: saved = $savedStops.some((savedStop) => savedStop.id == stop.id);
	let expanded = false;

	function toggleStopSave() {
		if (!saved) {
			let routeRefForStop: {
				[key: string]: components['schemas']['TransitRoute'] | undefined;
			} = {};
			stop.routeIds?.forEach((routeId) => {
				routeRefForStop[routeId] = references.routes?.[routeId];
			});
			saveStopToFirestore({ ...stop, routeRef: routeRefForStop });
		} else {
			stop.id && removeStopFromFirestore(stop.id);
		}
	}

	const departuresFromStop = createQuery({
		queryKey: ['stop', stop.id!],
		queryFn: async () => await fetchStopDepartures({ stopId: [stop.id!], limit: 3 }),
		enabled: false
	});
</script>

<div class="flex flex-row rounded border p-1 dark:border-none dark:bg-slate-800 dark:p-2">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="flex-1 cursor-pointer"
		on:click={() => {
			expanded = !expanded;
			$departuresFromStop.refetch();
		}}
	>
		<div class="flex-row">
			<div class="mb-1 dark:text-slate-50">{stop.name}</div>
		</div>
		<div class="flex flex-row flex-wrap gap-1">
			{#each stop?.routeIds ?? [] as routeid}
				{@const routeRef = stop?.routeRef?.[routeid] ?? references?.routes?.[routeid]}
				<span
					class="rounded p-1 text-xs"
					style:color={'#' + routeRef?.style?.icon?.textColor}
					style:background-color={'#' + routeRef?.style?.color}
					>{routeRef?.shortName ?? ''}
				</span>
			{/each}

			{#if stop.direction}
				<span class="h-3 w-3 align-middle"
					><span
						class="material-symbols-outlined dark:text-slate-50"
						style="transform: rotate({stop.direction + 'deg'});">arrow_upward</span
					></span
				>
			{/if}
		</div>
	</div>
	<div class="flex w-8 flex-col self-center p-1">
		<button on:click={() => toggleStopSave()}>
			<span
				class="material-symbols-outlined dark:text-slate-100"
				style:font-variation-settings={saved ? "'FILL' 1" : ''}>favorite</span
			>
		</button>
	</div>
</div>
{#if $departuresFromStop.isFetched && expanded}
	<div class="flex flex-col gap-1 rounded bg-none dark:bg-slate-700 p-1">
		<DeparturesList
			references={$departuresFromStop?.data?.references}
			departures={$departuresFromStop?.data?.entry?.stopTimes}
			expandable={false}
		/>
	</div>
{/if}
