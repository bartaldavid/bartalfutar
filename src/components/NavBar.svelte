<script lang="ts">
  import { page } from '$app/stores';
  import Favorite from '~icons/material-symbols/favorite';
  import Search from '~icons/material-symbols/search';
  import Nearby from '~icons/material-symbols/nearby';

  const navItems = [
    {
      label: 'Favorites',
      path: '/favorites',
      icon: Favorite
    },
    {
      label: 'Nearby',
      path: '/nearby',
      icon: Nearby
    },
    {
      label: 'Search',
      path: '/search',
      icon: Search
    }
  ];

  $: parent = $page.url.searchParams.get("from");
</script>

<nav
  class="fixed md:flex-col md:justify-normal md:gap-5 md:w-auto md:backdrop-blur-none md:sticky md:top-0 md:m-10 md:mt-12 bottom-0 z-50 flex w-full justify-evenly py-3 font-light text-slate-700 backdrop-blur-3xl dark:text-slate-100"
>
  {#each navItems as navItem}
    {@const active = navItem.path === $page.url.pathname || navItem.path === parent}
    <a href={navItem.path} class="flex flex-col items-center md:flex-row md:gap-2 p-2 rounded" class:active
      ><svelte:component this={navItem.icon} />
      <span class="text-sm md:text-base">{navItem.label}</span></a
    >
  {/each}
</nav>

<style>
  .active {
    @apply font-medium bg-slate-700;
  }
</style>
