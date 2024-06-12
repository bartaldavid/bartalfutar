<script lang="ts">
  import { page } from '$app/stores';
  import MapPin from 'lucide-svelte/icons/map-pin';

  let { place }: { place: { main: string; secondary: string; placeId: string } } = $props();
</script>

<a
  class="flex flex-row items-center gap-2 rounded bg-slate-50 p-2 dark:border-none dark:bg-slate-800"
  href="/directions?{new URLSearchParams({
    to_place_id: place.placeId,
    // this should probably be from server data so it can render on server
    ...($page.url.searchParams.get('from') && { from: $page.url.searchParams.get('from') || '' })
  }).toString()}"
>
  <MapPin class="mx-1" />
  <div class="">
    <div class=" dark:text-slate-50">{place.main}</div>
    <div class="text-sm font-light dark:text-slate-100">{place.secondary}</div>
  </div>
</a>
