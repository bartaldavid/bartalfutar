<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { components } from "../data/bkk-openapi";
  import { savedStops, type savedStop } from "../data/stores";
  import {
    removeStopFromFirestore,
    saveStopToFirestore,
  } from "../util/manageFbData";

  export let references: components["schemas"]["TransitReferences"] = {};
  export let stop: savedStop = {};
  $: saved = $savedStops.some((savedStop) => savedStop.id == stop.id);
  let expanded = false;

  function toggleStopSave() {
    if (!saved) {
      let routeRefForStop: {
        [key: string]: components["schemas"]["TransitRoute"] | undefined;
      } = {};
      stop.routeIds?.forEach((routeId) => {
        routeRefForStop[routeId] = references.routes?.[routeId];
      });
      saveStopToFirestore({ ...stop, routeRef: routeRefForStop });
    } else {
      stop.id && removeStopFromFirestore(stop.id);
      console.log("Remove event dispatched");
    }
  }

  function toggleStopExpansion() {
    expanded = !expanded;
  }
</script>

<div
  class="flex flex-row rounded border p-1 dark:border-none dark:bg-slate-800 dark:p-2"
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="flex-1 cursor-pointer" on:click={toggleStopExpansion}>
    <div class="flex-row">
      <div class="mb-1 dark:text-slate-50">{stop.name}</div>
    </div>
    <div class="flex flex-row flex-wrap gap-1">
      {#each stop?.routeIds ?? [] as routeid}
        {@const routeRef =
          stop?.routeRef?.[routeid] ?? references?.routes?.[routeid]}
        <span
          class="rounded p-1 text-xs"
          style:color={"#" + routeRef?.style?.icon?.textColor}
          style:background-color={"#" + routeRef?.style?.color}
          >{routeRef?.shortName ?? ""}
        </span>
      {/each}

      {#if stop.direction}
        <span class="h-3 w-3 align-middle"
          ><span
            class="material-symbols-outlined dark:text-slate-50"
            style="transform: rotate({stop.direction + 'deg'});"
            >arrow_upward</span
          ></span
        >
      {/if}
    </div>
    <!-- <div class="text-xs text-gray-500">{stop.id}</div> -->
  </div>
  <div class="flex w-8 flex-col self-center p-1">
    <button on:click={() => toggleStopSave()}>
      <span
        class="material-symbols-outlined dark:text-slate-100"
        style:font-variation-settings={saved ? "'FILL' 1" : ""}>favorite</span
      >
    </button>
  </div>
  {#if expanded}
    <div>expanded!</div>
  {/if}
</div>
