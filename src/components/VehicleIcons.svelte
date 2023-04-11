<script lang="ts">
  import type { components } from "../data/bkk-openapi";

  export let vehicleType: string;

  type typeMap = {
    [key in components["schemas"]["TransitStop"]["type"] as string]?: {
      icon: string;
      color: string;
    };
  };

  export const typesToIconsMap: typeMap = {
    RAIL: { icon: "train", color: "#2E5EA8" },
    BUS: { icon: "directions_bus", color: "#009EE3" },
    SUBWAY: { icon: "subway", color: "#005ca5" },
    TRAM: { icon: "tram", color: "#FFD800" },
    TROLLEYBUS: { icon: "directions_bus", color: "#009EE3" },
    COACH: { icon: "directions_bus", color: "#009EE3" },
    SUBURBAN_RAILWAY: { icon: "train", color: "#2E5EA8" },
  };
</script>

{#if vehicleType}
  <span
    class="material-symbols-outlined ml-1 self-center pr-3"
    style:color={typesToIconsMap[vehicleType]?.color}
  >
    {typesToIconsMap[vehicleType]?.icon}
  </span>
{/if}

<style>
  .material-symbols-outlined {
    font-variation-settings: "FILL" 1;
  }
</style>
