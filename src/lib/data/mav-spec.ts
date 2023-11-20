/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MavRoot {
  trainSchedulerDetails: any;
  stationSchedulerDetails: StationSchedulerDetails;
  routeSchedulerDetails: any;
}

interface StationSchedulerDetails {
  station: Station;
  arrivalScheduler: ArrivalScheduler[];
  departureScheduler: DepartureScheduler[];
  services: Service3[];
  moreResult: boolean;
  havariaInfos: any[];
}

interface Station {
  id: number;
  isAlias: boolean;
  name: string;
  code: string;
  baseCode: any;
  isInternational: boolean;
  canUseForOfferRequest: boolean;
  canUseForPessengerInformation: boolean;
  country: string | null;
  coutryIso: string | null;
  modalities: Modality[] | null;
  nameWithoutComma: string;
  isIn108_1: boolean;
}

interface ArrivalScheduler {
  aggregatedServiceIds: any[];
  name?: string;
  seatReservationCode: string;
  code: string;
  companyCode: any;
  route: any;
  startStationReservationCode: any;
  endStationReservationCode: any;
  startStation: StartStation;
  endStation: EndStation;
  startDate: string;
  origStartStation: any;
  origEndStation: any;
  start: string;
  virtualStart: boolean;
  arrive: string;
  modality: Modality3;
  virtualArrive: boolean;
  distance: number;
  closedTrackWay: boolean;
  fullName: string;
  fullNameAndType: string;
  kinds: Kind[];
  kindsToDisplay: KindsToDisplay[];
  kind: Kind2;
  services: Service[];
  actualOrEstimatedStart?: string;
  actualOrEstimatedArrive?: string;
  havarianInfok: HavarianInfok;
  directTrains: any;
  carrierTrains: any;
  startTrack: string;
  startTrackType: string;
  endTrack: string;
  endTrackType: string;
  jeEszkozAlapId: number;
  fullType: string;
  fullShortType: string;
  fullNameAndPiktogram: FullNameAndPiktogram;
  footer: any;
  viszonylatiJel?: ViszonylatiJel;
  viszonylatObject: ViszonylatObject;
  description: any;
  sameCar: boolean;
  startTimeZone: string;
  arriveTimeZone: string;
  trainId: string;
}

interface StartStation {
  id: number;
  isAlias: boolean;
  name: string;
  code: string;
  baseCode: string;
  isInternational: boolean;
  canUseForOfferRequest: boolean;
  canUseForPessengerInformation: boolean;
  country: string;
  coutryIso: string;
  modalities: Modality[];
  nameWithoutComma: string;
  isIn108_1: boolean;
}

interface Modality {
  code: number;
  name: any;
  description: any;
  order: number;
  isDefault: boolean;
  defaultColor: string;
  inkColor: string;
  sign: Sign;
  foreignNames: any;
  foreignDescriptions: any;
}

interface Sign {
  fontName: string;
  character: string;
}

interface EndStation {
  id: number;
  isAlias: boolean;
  name: string;
  code: string;
  baseCode: string;
  isInternational: boolean;
  canUseForOfferRequest: boolean;
  canUseForPessengerInformation: boolean;
  country: string;
  coutryIso: string;
  modalities: Modality2[];
  nameWithoutComma: string;
  isIn108_1: boolean;
}

interface Modality2 {
  code: number;
  name: any;
  description: any;
  order: number;
  isDefault: boolean;
  defaultColor: string;
  inkColor: string;
  sign: Sign;
  foreignNames: any;
  foreignDescriptions: any;
}

interface Modality3 {
  code: number;
  name: any;
  description: any;
  order: number;
  isDefault: boolean;
  defaultColor: string;
  inkColor: string;
  sign: Sign;
  foreignNames: any;
  foreignDescriptions: any;
}

interface Kind {
  name: string;
  sortName?: string;
  code: string;
  priority: number;
  backgroundColorCode: string;
  foregroundColorCode: string;
  sign: Sign;
  startStation: StartStation2;
  endStation: EndStation2;
}

interface StartStation2 {
  id: number;
  isAlias: boolean;
  name: string;
  code: string;
  baseCode: string;
  isInternational: boolean;
  canUseForOfferRequest: boolean;
  canUseForPessengerInformation: boolean;
  country: string;
  coutryIso: string;
  modalities: Modality4[];
  nameWithoutComma: string;
  isIn108_1: boolean;
}

interface Modality4 {
  code: number;
  name: any;
  description: any;
  order: number;
  isDefault: boolean;
  defaultColor: string;
  inkColor: string;
  sign: Sign;
  foreignNames: any;
  foreignDescriptions: any;
}

interface EndStation2 {
  id: number;
  isAlias: boolean;
  name: string;
  code: string;
  baseCode: string;
  isInternational: boolean;
  canUseForOfferRequest: boolean;
  canUseForPessengerInformation: boolean;
  country: string;
  coutryIso: string;
  modalities: Modality5[];
  nameWithoutComma: string;
  isIn108_1: boolean;
}

interface Modality5 {
  code: number;
  name: any;
  description: any;
  order: number;
  isDefault: boolean;
  defaultColor: string;
  inkColor: string;
  sign: Sign;
  foreignNames: any;
  foreignDescriptions: any;
}

interface KindsToDisplay {
  name: string;
  sortName?: string;
  code: string;
  priority: number;
  backgroundColorCode: string;
  foregroundColorCode: string;
  sign: Sign;
  startStation: StartStation3;
  endStation: EndStation3;
}

interface StartStation3 {
  id: number;
  isAlias: boolean;
  name: string;
  code: string;
  baseCode: string;
  isInternational: boolean;
  canUseForOfferRequest: boolean;
  canUseForPessengerInformation: boolean;
  country: string;
  coutryIso: string;
  modalities: Modality6[];
  nameWithoutComma: string;
  isIn108_1: boolean;
}

interface Modality6 {
  code: number;
  name: any;
  description: any;
  order: number;
  isDefault: boolean;
  defaultColor: string;
  inkColor: string;
  sign: Sign;
  foreignNames: any;
  foreignDescriptions: any;
}

interface EndStation3 {
  id: number;
  isAlias: boolean;
  name: string;
  code: string;
  baseCode: string;
  isInternational: boolean;
  canUseForOfferRequest: boolean;
  canUseForPessengerInformation: boolean;
  country: string;
  coutryIso: string;
  modalities: Modality7[];
  nameWithoutComma: string;
  isIn108_1: boolean;
}

interface Modality7 {
  code: number;
  name: any;
  description: any;
  order: number;
  isDefault: boolean;
  defaultColor: string;
  inkColor: string;
  sign: Sign;
  foreignNames: any;
  foreignDescriptions: any;
}

interface Kind2 {
  name: string;
  sortName?: string;
  code: string;
  priority: number;
  backgroundColorCode: string;
  foregroundColorCode: string;
  sign: Sign;
  startStation: StartStation4;
  endStation: EndStation4;
}

interface StartStation4 {
  id: number;
  isAlias: boolean;
  name: string;
  code: string;
  baseCode: string;
  isInternational: boolean;
  canUseForOfferRequest: boolean;
  canUseForPessengerInformation: boolean;
  country: string;
  coutryIso: string;
  modalities: Modality8[];
  nameWithoutComma: string;
  isIn108_1: boolean;
}

interface Modality8 {
  code: number;
  name: any;
  description: any;
  order: number;
  isDefault: boolean;
  defaultColor: string;
  inkColor: string;
  sign: Sign;
  foreignNames: any;
  foreignDescriptions: any;
}

interface EndStation4 {
  id: number;
  isAlias: boolean;
  name: string;
  code: string;
  baseCode: string;
  isInternational: boolean;
  canUseForOfferRequest: boolean;
  canUseForPessengerInformation: boolean;
  country: string;
  coutryIso: string;
  modalities: Modality9[];
  nameWithoutComma: string;
  isIn108_1: boolean;
}

interface Modality9 {
  code: number;
  name: any;
  description: any;
  order: number;
  isDefault: boolean;
  defaultColor: string;
  inkColor: string;
  sign: Sign;
  foreignNames: any;
  foreignDescriptions: any;
}

interface Sign {
  fontName: string;
  character: string;
}

interface Service {
  code: any;
  listOrder: any;
  description: string;
  restrictiveStartStationCode: any;
  restrictiveEndStationCode: any;
  sign: Sign;
  trainStopKind: any;
}

interface HavarianInfok {
  aktualisKeses: number;
  kesesiOk?: string;
  havariaInfo?: string[];
  uzletiInfo: any;
  kesesInfo: string;
}

interface FullNameAndPiktogram {
  '(Collection)': string;
}

interface ViszonylatiJel {
  piktogramFullName: any;
  fontSzinKod: string;
  hatterSzinKod: string;
  sign: Sign;
  jel: string;
}

interface ViszonylatObject {
  startStationCode: string;
  startTime: string;
  startTimeZone: string;
  endStationCode: string;
  endTime: string;
  endTimeZone: string;
  travelTime: number;
  startTrack: any;
  endTrack: any;
  innerStationCodes: string[];
}

interface DepartureScheduler {
  aggregatedServiceIds: any[];
  name?: string;
  seatReservationCode: string;
  code: string;
  companyCode: any;
  route: any;
  startStationReservationCode: any;
  endStationReservationCode: any;
  startStation: StartStation5;
  endStation: EndStation5;
  startDate: string;
  origStartStation: any;
  origEndStation: any;
  start: string;
  virtualStart: boolean;
  arrive: string;
  modality: Modality12;
  virtualArrive: boolean;
  distance: number;
  closedTrackWay: boolean;
  fullName: string;
  fullNameAndType: string;
  kinds: Kind3[];
  kindsToDisplay: KindsToDisplay2[];
  kind: Kind4;
  services: Service2[];
  actualOrEstimatedStart?: string;
  actualOrEstimatedArrive?: string;
  havarianInfok: HavarianInfok2;
  directTrains: any;
  carrierTrains: any;
  startTrack: string;
  startTrackType: string;
  endTrack: string;
  endTrackType: string;
  jeEszkozAlapId: number;
  fullType: string;
  fullShortType: string;
  fullNameAndPiktogram: FullNameAndPiktogram2;
  footer: any;
  viszonylatiJel?: ViszonylatiJel2;
  viszonylatObject: ViszonylatObject2;
  description: any;
  sameCar: boolean;
  startTimeZone: string;
  arriveTimeZone: string;
  trainId: string;
}

interface StartStation5 {
  id: number;
  isAlias: boolean;
  name: string;
  code: string;
  baseCode: string;
  isInternational: boolean;
  canUseForOfferRequest: boolean;
  canUseForPessengerInformation: boolean;
  country: string;
  coutryIso: string;
  modalities: Modality10[];
  nameWithoutComma: string;
  isIn108_1: boolean;
}

interface Modality10 {
  code: number;
  name: any;
  description: any;
  order: number;
  isDefault: boolean;
  defaultColor: string;
  inkColor: string;
  sign: Sign;
  foreignNames: any;
  foreignDescriptions: any;
}

interface EndStation5 {
  id: number;
  isAlias: boolean;
  name: string;
  code: string;
  baseCode: string;
  isInternational: boolean;
  canUseForOfferRequest: boolean;
  canUseForPessengerInformation: boolean;
  country: string;
  coutryIso: string;
  modalities: Modality11[];
  nameWithoutComma: string;
  isIn108_1: boolean;
}

interface Modality11 {
  code: number;
  name: any;
  description: any;
  order: number;
  isDefault: boolean;
  defaultColor: string;
  inkColor: string;
  sign: Sign;
  foreignNames: any;
  foreignDescriptions: any;
}

interface Modality12 {
  code: number;
  name: any;
  description: any;
  order: number;
  isDefault: boolean;
  defaultColor: string;
  inkColor: string;
  sign: Sign;
  foreignNames: any;
  foreignDescriptions: any;
}

interface Kind3 {
  name: string;
  sortName?: string;
  code: string;
  priority: number;
  backgroundColorCode: string;
  foregroundColorCode: string;
  sign: Sign;
  startStation: StartStation6;
  endStation: EndStation6;
}

interface StartStation6 {
  id: number;
  isAlias: boolean;
  name: string;
  code: string;
  baseCode: string;
  isInternational: boolean;
  canUseForOfferRequest: boolean;
  canUseForPessengerInformation: boolean;
  country: string;
  coutryIso: string;
  modalities: Modality13[];
  nameWithoutComma: string;
  isIn108_1: boolean;
}

interface Modality13 {
  code: number;
  name: any;
  description: any;
  order: number;
  isDefault: boolean;
  defaultColor: string;
  inkColor: string;
  sign: Sign;
  foreignNames: any;
  foreignDescriptions: any;
}

interface EndStation6 {
  id: number;
  isAlias: boolean;
  name: string;
  code: string;
  baseCode: string;
  isInternational: boolean;
  canUseForOfferRequest: boolean;
  canUseForPessengerInformation: boolean;
  country: string;
  coutryIso: string;
  modalities: Modality14[];
  nameWithoutComma: string;
  isIn108_1: boolean;
}

interface Modality14 {
  code: number;
  name: any;
  description: any;
  order: number;
  isDefault: boolean;
  defaultColor: string;
  inkColor: string;
  sign: Sign;
  foreignNames: any;
  foreignDescriptions: any;
}

interface KindsToDisplay2 {
  name: string;
  sortName?: string;
  code: string;
  priority: number;
  backgroundColorCode: string;
  foregroundColorCode: string;
  sign: Sign;
  startStation: StartStation7;
  endStation: EndStation7;
}

interface StartStation7 {
  id: number;
  isAlias: boolean;
  name: string;
  code: string;
  baseCode: string;
  isInternational: boolean;
  canUseForOfferRequest: boolean;
  canUseForPessengerInformation: boolean;
  country: string;
  coutryIso: string;
  modalities: Modality15[];
  nameWithoutComma: string;
  isIn108_1: boolean;
}

interface Modality15 {
  code: number;
  name: any;
  description: any;
  order: number;
  isDefault: boolean;
  defaultColor: string;
  inkColor: string;
  sign: Sign;
  foreignNames: any;
  foreignDescriptions: any;
}

interface EndStation7 {
  id: number;
  isAlias: boolean;
  name: string;
  code: string;
  baseCode: string;
  isInternational: boolean;
  canUseForOfferRequest: boolean;
  canUseForPessengerInformation: boolean;
  country: string;
  coutryIso: string;
  modalities: Modality16[];
  nameWithoutComma: string;
  isIn108_1: boolean;
}

interface Modality16 {
  code: number;
  name: any;
  description: any;
  order: number;
  isDefault: boolean;
  defaultColor: string;
  inkColor: string;
  sign: Sign;
  foreignNames: any;
  foreignDescriptions: any;
}

interface Sign {
  fontName: string;
  character: string;
}

interface Kind4 {
  name: string;
  sortName?: string;
  code: string;
  priority: number;
  backgroundColorCode: string;
  foregroundColorCode: string;
  sign: Sign;
  startStation: StartStation8;
  endStation: EndStation8;
}

interface StartStation8 {
  id: number;
  isAlias: boolean;
  name: string;
  code: string;
  baseCode: string;
  isInternational: boolean;
  canUseForOfferRequest: boolean;
  canUseForPessengerInformation: boolean;
  country: string;
  coutryIso: string;
  modalities: Modality17[];
  nameWithoutComma: string;
  isIn108_1: boolean;
}

interface Modality17 {
  code: number;
  name: any;
  description: any;
  order: number;
  isDefault: boolean;
  defaultColor: string;
  inkColor: string;
  sign: Sign;
  foreignNames: any;
  foreignDescriptions: any;
}

interface EndStation8 {
  id: number;
  isAlias: boolean;
  name: string;
  code: string;
  baseCode: string;
  isInternational: boolean;
  canUseForOfferRequest: boolean;
  canUseForPessengerInformation: boolean;
  country: string;
  coutryIso: string;
  modalities: Modality18[];
  nameWithoutComma: string;
  isIn108_1: boolean;
}

interface Modality18 {
  code: number;
  name: any;
  description: any;
  order: number;
  isDefault: boolean;
  defaultColor: string;
  inkColor: string;
  sign: Sign;
  foreignNames: any;
  foreignDescriptions: any;
}

interface Service2 {
  code: any;
  listOrder: any;
  description: string;
  restrictiveStartStationCode: any;
  restrictiveEndStationCode: any;
  sign: Sign;
  trainStopKind: any;
}

interface HavarianInfok2 {
  aktualisKeses: number;
  kesesiOk?: string;
  havariaInfo?: string[];
  uzletiInfo: any;
  kesesInfo: string;
}

interface FullNameAndPiktogram2 {
  '(Collection)': string;
}

interface ViszonylatiJel2 {
  piktogramFullName: any;
  fontSzinKod: string;
  hatterSzinKod: string;
  sign: Sign;
  jel: string;
}

interface ViszonylatObject2 {
  startStationCode: string;
  startTime: string;
  startTimeZone: string;
  endStationCode: string;
  endTime: string;
  endTimeZone: string;
  travelTime: number;
  startTrack: any;
  endTrack: any;
  innerStationCodes: string[];
}

interface Service3 {
  code: any;
  listOrder: any;
  description: string;
  restrictiveStartStationCode: any;
  restrictiveEndStationCode: any;
  sign: Sign;
  trainStopKind: any;
}
