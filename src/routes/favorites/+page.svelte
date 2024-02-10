<script lang="ts">
  import StopsView from '../../components/StopsView.svelte';
  import PageLayout from '../../components/PageLayout.svelte';
  import type { PageData } from './$types';
  import * as Avatar from '$lib/components/ui/avatar';
  import { UserCircle } from 'lucide-svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import Button from '$lib/components/ui/button/button.svelte';
  import { signOut } from '@auth/sveltekit/client';
  // import DropdownMenuContent from '$lib/components/ui/dropdown-menu/dropdown-menu-content.svelte';

  export let data: PageData;
  $: stops = data.stops ?? [];
</script>

<PageLayout pageTitle="Favorites">
  <svelte:fragment slot="header">
    <div class="flex items-center">
      <!-- {#if data.session?.user?.image}
        <img
          src={data.session?.user?.image}
          alt="Profile"
          height="30"
          width="30"
          class="m-1 aspect-square rounded-full"
          loading="lazy"
        /> -->
      {#if data.session}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar.Root>
              <Avatar.Image
                src={data.session?.user?.image}
                alt="Profile"
                class="aspect-square rounded-full p-1"
                loading="lazy"
              />
              <Avatar.Fallback>
                <UserCircle size="30" />
              </Avatar.Fallback>
            </Avatar.Root>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content class="w-40">
            <DropdownMenu.Label>{data.session?.user.name}</DropdownMenu.Label>
            <DropdownMenu.Item>
              <!-- <a href="/auth/signout" data-sveltekit-preload-data="off">Sign Out</a> -->
              <button on:click={() => signOut()}>Sign out</button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      {:else}
        <Button href="/auth/signin" data-sveltekit-preload-data="off">Sign In</Button>
      {/if}
      <!-- {:else}
          <UserCircle size="30" />
          {/if} -->
    </div>
  </svelte:fragment>

  <svelte:fragment slot="content">
    <StopsView groups={stops} />
    <!-- <button class="rounded bg-slate-700 p-2 text-white" on:click={() => console.log(data.session)}
      >Get user</button
    > -->
  </svelte:fragment>
</PageLayout>
