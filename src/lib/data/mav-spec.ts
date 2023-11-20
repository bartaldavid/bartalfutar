/* eslint-disable @typescript-eslint/no-explicit-any */

export type MavRoot = {
  trainSchedulerDetails: null;
  stationSchedulerDetails: StationSchedulerDetails;
  routeSchedulerDetails: null;
};

export type StationSchedulerDetails = {
  station: Station;
  arrivalScheduler: Scheduler[];
  departureScheduler: Scheduler[];
  services: Service[];
  moreResult: boolean;
  havariaInfos: string[];
};

export type Scheduler = {
  aggregatedServiceIds: any[];
  name: null | string;
  seatReservationCode: string;
  code: string;
  companyCode: null;
  route: null;
  startStationReservationCode: null;
  endStationReservationCode: null;
  startStation: Station;
  endStation: Station;
  startDate: string;
  origStartStation: null;
  origEndStation: null;
  start: null | string;
  virtualStart: boolean;
  arrive: null | string;
  modality: Modality;
  virtualArrive: boolean;
  distance: number;
  closedTrackWay: boolean;
  fullName: string;
  fullNameAndType: string;
  kinds: Kind[];
  kindsToDisplay: Kind[];
  kind: Kind;
  services: Service[];
  actualOrEstimatedStart: null | string;
  actualOrEstimatedArrive: null | string;
  havarianInfok: HavarianInfok;
  directTrains: null;
  carrierTrains: null;
  startTrack: null | string;
  startTrackType: null | string;
  endTrack: null | string;
  endTrackType: null | string;
  jeEszkozAlapId: number;
  fullType: string;
  fullShortType: string;
  fullNameAndPiktogram: FullNameAndPiktogram;
  footer: null;
  viszonylatiJel: ViszonylatiJel | null;
  viszonylatObject: ViszonylatObject;
  description: null;
  sameCar: boolean;
  startTimeZone: null | string;
  arriveTimeZone: null | string;
  trainId: string;
};

export type Station = {
  id: number;
  isAlias: boolean;
  name: string;
  code: string;
  baseCode: null | string;
  isInternational: boolean;
  canUseForOfferRequest: boolean;
  canUseForPessengerInformation: boolean;
  country: null | string;
  coutryIso: null | string;
  modalities: Modality[] | null;
  nameWithoutComma: string;
  isIn108_1: boolean;
};

export type Modality = {
  code: number;
  name: null;
  description: null;
  order: number;
  isDefault: boolean;
  defaultColor: string;
  inkColor: string;
  sign: Sign;
  foreignNames: null;
  foreignDescriptions: null;
};

export type Sign = {
  fontName: string;
  character: string;
};

export type FullNameAndPiktogram = {
  '(Collection)': string;
};

export type HavarianInfok = {
  aktualisKeses: number;
  kesesiOk: null | string;
  havariaInfo: string[] | null;
  uzletiInfo: null;
  kesesInfo: string;
};

export type Kind = {
  name: string;
  sortName: null | string;
  code: string;
  priority: number;
  backgroundColorCode: string;
  foregroundColorCode: string;
  sign: Sign;
  startStation: Station;
  endStation: Station;
};

export type Service = {
  code: null;
  listOrder: null;
  description: string;
  restrictiveStartStationCode: null;
  restrictiveEndStationCode: null;
  sign: Sign;
  trainStopKind: null;
};

export type ViszonylatObject = {
  startStationCode: string;
  startTime: string;
  startTimeZone: string;
  endStationCode: string;
  endTime: string;
  endTimeZone: string;
  travelTime: number;
  startTrack: null;
  endTrack: null;
  innerStationCodes: string[];
};

export type ViszonylatiJel = {
  piktogramFullName: null;
  fontSzinKod: string;
  hatterSzinKod: string;
  sign: Sign;
  jel: string;
};
