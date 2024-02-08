<script lang="ts">
  import StopsView from '../../components/StopsView.svelte';
  import PageLayout from '../../components/PageLayout.svelte';
  import type { PageData } from './$types';
  import * as Avatar from '$lib/components/ui/avatar';
  import { UserCircle } from 'lucide-svelte';
  import * as Popover from '$lib/components/ui/popover';

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
      <Popover.Root>
        <Popover.Trigger>
          <Avatar.Root>
            <Avatar.Image
              src={data.session?.user?.image}
              alt="Profile"
              class="m-1 aspect-square rounded-full"
              loading="lazy"
              height="30"
              width="30"
            />
            <Avatar.Fallback>
              <UserCircle size="30" />
            </Avatar.Fallback>
          </Avatar.Root>
        </Popover.Trigger>
        <Popover.Content class="w-40">
          {#if data.session}
            <a href="/auth/signout" data-sveltekit-preload-data="off">Sign Out</a>
          {:else}
            <a href="/auth/signin" data-sveltekit-preload-data="off">Sign In</a>
          {/if}
        </Popover.Content>
      </Popover.Root>
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
