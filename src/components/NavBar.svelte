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

  $: parent = $page.url.searchParams.get('from');
</script>

<nav
  class="fixed bottom-0 z-50 flex w-full justify-evenly py-3 font-light text-slate-700 backdrop-blur-3xl dark:text-slate-300 md:sticky md:top-0 md:m-10 md:mt-12 md:w-auto md:flex-col md:justify-normal md:gap-5 md:backdrop-blur-none"
>
  {#each navItems as navItem}
    {@const active = navItem.path === $page.url.pathname || navItem.path === parent}
    <a
      href={navItem.path}
      class="flex flex-col items-center rounded p-2 px-6 hover:dark:text-slate-200 md:flex-row md:gap-2 {active &&
        ' font-normal dark:text-slate-200 md:bg-slate-200 md:dark:bg-slate-700'}"
      ><svelte:component this={navItem.icon} />
      <span class="text-sm md:text-base">{navItem.label}</span></a
    >
  {/each}
</nav>
