<script lang="ts">
  import StopsView from '../../components/StopsView.svelte';
  import PageLayout from '../../components/PageLayout.svelte';
  import * as Avatar from '$lib/components/ui/avatar';
  import UserCircle from 'lucide-svelte/icons/circle-user';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import Button from '$lib/components/ui/button/button.svelte';
  import { signOut } from '@auth/sveltekit/client';
  import * as m from '$lib/paraglide/messages.js';
  // import DropdownMenuContent from '$lib/components/ui/dropdown-menu/dropdown-menu-content.svelte';

  let { data } = $props();
</script>

{#snippet header()}
  <div class="flex items-center">
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
            <button onclick={() => signOut()}>{m.sign_out()}</button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    {:else}
      <Button href="/auth/signin" data-sveltekit-preload-data="off">{m.sign_in()}</Button>
    {/if}
  </div>
{/snippet}

<PageLayout pageTitle={m.favorites()} {header}><StopsView groups={data.stops} /></PageLayout>
