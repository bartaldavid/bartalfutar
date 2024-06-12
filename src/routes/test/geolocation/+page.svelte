<script lang="ts">
  import { useGeolocationPermission } from '$lib/stores/geolocation-permission.svelte';

  let { query, state } = useGeolocationPermission();
</script>

<pre class="text-white">{JSON.stringify(state.value)}</pre>

<button onclick={query}>Refresh</button>
