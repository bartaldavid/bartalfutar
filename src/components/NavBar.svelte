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
</script>

<nav
  class="fixed bottom-0 z-50 flex w-full justify-evenly py-3 font-light text-slate-700 backdrop-blur-3xl dark:text-slate-50"
>
  {#each navItems as navItem}
    {@const active = navItem.path === $page.url.pathname}
    <a href={navItem.path} class="flex flex-col items-center" class:font-medium={active}
      ><svelte:component this={navItem.icon} />
      <span class="text-sm">{navItem.label}</span></a
    >
  {/each}
</nav>
