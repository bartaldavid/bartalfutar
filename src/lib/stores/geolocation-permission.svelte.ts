import { writable } from 'svelte/store';

export const geolocationPermissionState = writable<PermissionState>('prompt');

// FIXME: This is an alternate solution, but it doesn't work in Safari, maybe refractor this into a store with addeventlistener
export async function listenForPermissionChange() {
  if (!navigator) return;

  const geolocationPermission = await navigator.permissions.query({
    name: 'geolocation',
  });
  geolocationPermissionState.set(geolocationPermission.state);
  geolocationPermission.onchange = () =>
    geolocationPermissionState.set(geolocationPermission.state);
}

export function useGeolocationPermission() {
  let state = $state<PermissionState | undefined>(undefined);
  let permissionStatus: PermissionStatus | undefined;

  function onChange() {
    if (permissionStatus) state = permissionStatus.state;
  }

  async function query() {
    console.log('querying geolocation permission');

    permissionStatus =
      navigator && 'permissions' in navigator
        ? await navigator.permissions.query({ name: 'geolocation' })
        : undefined;

    if (permissionStatus) {
      console.log('geolocation permission status:', permissionStatus.state);

      state = permissionStatus.state;
      console.log('state:', state);
      permissionStatus.addEventListener('change', onChange);
    }
  }

  $effect(() => {
    query();

    return () => {
      console.log('cleaning up geolocation permission store');
      permissionStatus?.removeEventListener('change', onChange);
    };
  });

  return {
    state: {
      get value() {
        return state;
      },
    },

    query,
  };
}
