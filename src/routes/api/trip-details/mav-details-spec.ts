/* eslint-disable @typescript-eslint/no-explicit-any */
export type MavTrainDetails = {
  trainSchedulerDetails: TrainSchedulerDetail[];
  stationSchedulerDetails: null;
  routeSchedulerDetails: null;
};

export type TrainSchedulerDetail = {
  train: Train;
  scheduler: Scheduler[];
};

export type Scheduler = {
  station: Station;
  arrive: null | string;
  start: null | string;
  actualOrEstimatedArrive: null | string;
  actualOrEstimatedStart: null | string;
  startTrack: null | string;
  startTrackType: TrackType | null;
  endTrack: null | string;
  endTrackType: TrackType | null;
  services: any[];
  stopKind: number;
  stopService: Service;
  distance: number;
  startTimeZone: TimeZone | null;
  arriveTimeZone: TimeZone | null;
};

export type TimeZone = 'KözEI';

export type TrackType = 'Plan' | 'FactPlanEqual' | 'FactPlanDifference';

export type Station = {
  id: number;
  isAlias: boolean;
  name: string;
  code: string;
  baseCode: string;
  isInternational: boolean;
  canUseForOfferRequest: boolean;
  canUseForPessengerInformation: boolean;
  country: Country;
  coutryIso: CoutryISO;
  modalities: Modality[];
  nameWithoutComma: string;
  isIn108_1: boolean;
};

export type Country = 'Magyarország';

export type CoutryISO = 'HU';

export type Modality = {
  code: number;
  name: null;
  description: null;
  order: number;
  isDefault: boolean;
  defaultColor: DefaultColor;
  inkColor: InkColor;
  sign: Sign;
  foreignNames: null;
  foreignDescriptions: null;
};

export type DefaultColor = '#1C4281';

export type InkColor = '#FEFEFE';

export type Sign = {
  fontName: FontName;
  character: string;
};

export type FontName = '/MAVI.MAVSTART.JE.Common;component/Resources/#MNR2007';

export type Service = {
  code: null | string;
  listOrder: null | string;
  description: null | string;
  restrictiveStartStationCode: null;
  restrictiveEndStationCode: null;
  sign: Sign | null;
  trainStopKind: null;
};

export type Train = {
  aggregatedServiceIds: any[];
  name: null;
  seatReservationCode: string;
  code: string;
  companyCode: null;
  route: null;
  startStationReservationCode: null;
  endStationReservationCode: null;
  startStation: Station;
  endStation: Station;
  startDate: null;
  origStartStation: null;
  origEndStation: null;
  start: string;
  virtualStart: boolean;
  arrive: string;
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
  actualOrEstimatedStart: null;
  actualOrEstimatedArrive: null;
  havarianInfok: HavarianInfok;
  directTrains: null;
  carrierTrains: null;
  startTrack: null;
  startTrackType: null;
  endTrack: null;
  endTrackType: null;
  jeEszkozAlapId: number;
  fullType: string;
  fullShortType: string;
  fullNameAndPiktogram: FullNameAndPiktogram;
  footer: string;
  viszonylatiJel: ViszonylatiJel;
  viszonylatObject: ViszonylatObject;
  description: null;
  sameCar: boolean;
  startTimeZone: null;
  arriveTimeZone: null;
  trainId: string;
};

export type FullNameAndPiktogram = {
  '(Collection)': string;
};

export type HavarianInfok = {
  aktualisKeses: number;
  kesesiOk: null;
  havariaInfo: null;
  uzletiInfo: null;
  kesesInfo: string;
};

export type Kind = {
  name: string;
  sortName: string;
  code: string;
  priority: number;
  backgroundColorCode: string;
  foregroundColorCode: string;
  sign: Sign;
  startStation: Station;
  endStation: Station;
};

export type ViszonylatObject = {
  startStationCode: string;
  startTime: string;
  startTimeZone: TimeZone;
  endStationCode: string;
  endTime: string;
  endTimeZone: TimeZone;
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
