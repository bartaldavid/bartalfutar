import { writable } from 'svelte/store';

type PositionState = {
  enabled: boolean;
  position: GeolocationPosition | null;
  error: GeolocationPositionError | { message: string }| null;
  isLoading: boolean;
  isLoaded: boolean;
  isDenied: boolean;
  isSupported: boolean;
};

const initialState: PositionState = {
  enabled: false,
  position: null,
  error: null,
  isLoading: false,
  isLoaded: false,
  isDenied: false,
  isSupported: false
};

const defaultOptions: PositionOptions = {
  timeout: 3000,
  maximumAge: 0,
  enableHighAccuracy: true
};

export const location = writable<PositionState>(initialState);

export function loadLocation(options: PositionOptions = defaultOptions) {
  if (!navigator.geolocation) {
    location.set({
      ...initialState,
      error: {message: 'Geolocation is not supported by this browser.'},
      isSupported: false
    });
  }

  location.update((state) => ({...state, isLoading: true, isSupported: true}));

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      console.log('accurate to ' + pos.coords.accuracy);
      location.update((state) => ({
        ...state,
        position: pos,
        isSupported: true,
        isLoading: false,
        isLoaded: true,
        error: null,
      }));
    },
    (err) => {
      location.update((state) => ({
        ...state,
        error: err,
        isSupported: true,
        isLoading: false,
        isLoaded: false,
        isDenied: err.code === err.PERMISSION_DENIED
      }));
    },
    options
    );
}
