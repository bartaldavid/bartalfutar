import { writable } from 'svelte/store';

export const geolocationPermissionState = writable<PermissionState>('prompt');

// FIXME: This is an alternate solution, but it doesn't work in Safari, maybe refractor this into a store with addeventlistener
export async function listenForPermissionChange() {
  if (!navigator) return;

  const geolocationPermission = await navigator.permissions.query({ name: 'geolocation' });
  geolocationPermissionState.set(geolocationPermission.state);
  geolocationPermission.onchange = () =>
    geolocationPermissionState.set(geolocationPermission.state);
}
