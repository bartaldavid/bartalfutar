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
  class="flex justify-evenly text-white font-light backdrop-blur-3xl py-3 fixed bottom-0 w-full z-50"
>
  {#each navItems as navItem}
    {@const active = navItem.path === $page.url.pathname}
    <a href={navItem.path} class="flex items-center flex-col" class:font-medium={active}
      ><svelte:component this={navItem.icon} />
      <span class="text-sm">{navItem.label}</span></a
    >
  {/each}
</nav>
