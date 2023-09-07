<script lang="ts">
  import type { components } from '../data/bkk-openapi';

  export let routeData: components['schemas']['TransitRoute'] = {};
  export let headSign: string = '';
</script>

<div class="my-1 text-sm">
  <span
    style:color={'#' + routeData?.style?.icon?.textColor}
    style:background-color={'#' + routeData?.style?.color}
    class="rounded p-1"
  >
    {routeData?.shortName}
  </span>
  <span>{headSign}</span>
</div>
