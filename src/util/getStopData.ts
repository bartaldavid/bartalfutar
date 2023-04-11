import { stopDataUrl } from "../data/api-links";
import type { components } from "../data/bkk-openapi";
import { defaultStopParams } from "../data/defaultParams";
import { fetchData } from "./fetch";

export async function getStopData(stopId: string): Promise<void> {
  let loading = true,
    error = "",
    data = {};
  const stopParams = { ...defaultStopParams, stopId: [stopId] };

  ({ loading, error, data } = await fetchData<
    components["schemas"]["ArrivalsAndDeparturesForStopOTPMethodResponse"]
  >(stopDataUrl, stopParams));
  $fetchError = error;

  // TODO throw error
  const references = data?.references!;
  const departures = data?.entry?.stopTimes!;
}
