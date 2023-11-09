<script lang="ts">
  import type { RouteIcon } from '$lib/types';

  export let icon: RouteIcon = {};
</script>

<span
  style:color={'#' + icon.textColor}
  style:background-color={'#' + icon.color}
  class="rounded p-1 text-sm"
>
  {icon.text}
</span>
