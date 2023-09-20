import { writable } from "svelte/store";

export const geolocationPermissionState = writable<PermissionState>("prompt");

export async function listenForPermissionChange() {
    if (!navigator) return;

    const geolocationPermission = await navigator.permissions.query({ name: "geolocation" });
    geolocationPermissionState.set(geolocationPermission.state)
    geolocationPermission.onchange = () => geolocationPermissionState.set(geolocationPermission.state)
}
