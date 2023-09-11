<script lang="ts">
  import type { components } from '../lib/data/bkk-openapi';

  export let routeData: components['schemas']['TransitRoute'] = {};
</script>

<span
  style:color={'#' + routeData?.style?.icon?.textColor}
  style:background-color={'#' + routeData?.style?.color}
  class="rounded p-1"
>
  {routeData?.shortName}
</span>
