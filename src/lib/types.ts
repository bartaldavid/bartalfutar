export type RouteIcon = {
  text?: string;
  color?: string;
  textColor?: string;
};

export type Stop = {
  id: string;
  name: string;
  routes?: RouteIcon[];
  direction?: string;
  locationType?: number;
};

export type Departure = {
  id: string;
  icon?: RouteIcon;
  // FIXME do these need null
  arrivalTime?: number | null;
  departureTime?: number | null;
  predictedArrivalTime?: number | null;
  predictedDepartureTime?: number | null;
  headSign?: string;
  alerts?: string[];
};

export type TripDetails = {
  id: string;
  stopName?: string;
  relevantStopTime?: number;
}[];

export type DepartureGroup = {
  id: string;
  icon?: RouteIcon;
  headSign?: string;
  departures?: {
    id: string;
    arrivalTime?: number | null;
    departureTime?: number | null;
    predictedArrivalTime?: number | null;
    predictedDepartureTime?: number | null;
  }[];
};
