import type { Schemas } from './server/futar';

export type RouteIcon = {
  text?: string;
  color?: string;
  textColor?: string;
};

export type TStop = {
  id: string;
  name: string;
  routes?: RouteIcon[];
  direction?: string;
  locationType?: number;
};

export type StopGroup = {
  [key in Schemas.TransitStop['type'] | 'MULTIPLE' as string]: {
    id: string;
    name: string;
  }[];
};

export type DepartureType = {
  id: string;
  icon?: RouteIcon;
  // FIXME do these need null
  arrivalTime?: number | null;
  departureTime?: number | null;
  predictedArrivalTime?: number | null;
  predictedDepartureTime?: number | null;
  headSign?: string;
  alerts?: string[];
  platform?: string;
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
