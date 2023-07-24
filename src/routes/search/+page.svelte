<script lang="ts">
	import type { savedStop } from '../../util/client/savedStop';
	import { createQuery } from '@tanstack/svelte-query';
	import { debounceIntervalMs, searchQueryMinimumLength } from '../../data/constants';
	import Stop from '../../components/Stop.svelte';
	import { savedStops } from '../../util/client/firebase';
  import { safeFetch } from '$lib/safeFetch';
  import { stopsForLocationUrl } from '../../data/api-links';
  import type { components } from '../../data/bkk-openapi';

	let searchQuery: string = '';
	let timer: NodeJS.Timeout;
	let stopsToDisplay: savedStop[];

	// FIXME refractor this to be a bit cleaner
	$: stopsToDisplay =
		searchQuery.length <= searchQueryMinimumLength
			? $savedStops
			: $searchData.data?.data?.list
			? $searchData.data?.data?.list.filter((stop) => {
					return stop?.locationType == 0 && stop?.routeIds?.length;
			  })
			: [];

	const searchData = createQuery({
		queryKey: ['search', searchQuery],
		queryFn: async () => await safeFetch<components["schemas"]["StopsForLocationResponse"]>(stopsForLocationUrl({ query: searchQuery })),
		enabled: false
	});

	function debounceFetch() {
		clearTimeout(timer);
		if (searchQuery.length > searchQueryMinimumLength) {
			timer = setTimeout(() => $searchData.refetch(), debounceIntervalMs);
		}
	}
</script>

<div class="m-1 mt-4 flex w-full flex-col sm:w-72">
	<div class="mb-2 flex flex-row rounded bg-slate-200 p-2 dark:bg-slate-700">
		<a href="/" class="w-6 pr-2"
			><span class="material-symbols-outlined inline-flex pr-2 align-middle dark:text-slate-100"
				>arrow_back</span
			></a
		>
		<input
			type="text"
			placeholder="Search for stops"
			bind:value={searchQuery}
			on:keyup={() => {
				debounceFetch();
			}}
			autofocus
			class="flex-1 bg-slate-200 outline-none dark:bg-slate-700 dark:text-slate-100"
		/>
		<!-- FIXME this should only be a loading indicator -->
		<button on:click={async () => await $searchData.refetch()} class="dark:text-slate-100"
			>{$searchData.isFetching ? 'Loading...' : 'Search'}</button
		>
	</div>

	<div class="flex flex-col gap-1">
		{#each stopsToDisplay as stop}
			<Stop references={$searchData.data?.data?.references} {stop} />
		{/each}
	</div>
</div>
