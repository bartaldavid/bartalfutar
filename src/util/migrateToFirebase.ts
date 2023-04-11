import type { components } from "../data/bkk-openapi";
import type { savedStop } from "../data/stores";
import { batchWriteStopsToFirestore } from "./manageFbData";

const LS_KEY_STOPS = "bkk.stops";
const LS_KEY_REF = "bkk.reference";

export default async function migrate() {
  const localStorageStops = localStorage.getItem(LS_KEY_STOPS);
  const localStorageRef = localStorage.getItem(LS_KEY_REF);

  if (localStorageRef === null || localStorageStops === null) {
    console.log("No localstorage data to be migrated");
    return;
  }

  try {
    const storedStops: components["schemas"]["TransitStop"][] =
      JSON.parse(localStorageStops);
    const storedRef: {
      [key: string]: components["schemas"]["TransitRoute"] | undefined;
    } = JSON.parse(localStorageRef);
    const stopsToBeSaved: savedStop[] = [];

    storedStops.forEach((storedStop) => {
      const routeRefForStop: {
        [key: string]: components["schemas"]["TransitRoute"] | undefined;
      } = {};

      storedStop.routeIds?.forEach((routeId) => {
        routeRefForStop[routeId] = storedRef[routeId];
      });
      stopsToBeSaved.push({ ...storedStop, routeRef: routeRefForStop });
    });

    await batchWriteStopsToFirestore(stopsToBeSaved);
    console.log("Migration successful");

    localStorage.removeItem(LS_KEY_REF);
    localStorage.removeItem(LS_KEY_STOPS);
  } catch (error) {
    console.error(error);
  }
}
