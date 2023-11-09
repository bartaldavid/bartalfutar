import { PUBLIC_BKK_API_KEY } from '$env/static/public';

/* eslint-disable @typescript-eslint/no-namespace */
export namespace Schemas {
  // <Schemas>
  export type ApiVersion = '2' | '3' | '4';
  export type Dialect = 'otp' | 'mobile';
  export type ReferencesSchema =
    | 'true'
    | 'false'
    | 'compact'
    | 'agencies'
    | 'routes'
    | 'trips'
    | 'stops'
    | 'alerts'
    | 'stations';
  export type Status =
    | 'NOT_MODIFIED'
    | 'OK'
    | 'UNKNOWN_ERROR'
    | 'NOT_FOUND'
    | 'INVALID_VALUE'
    | 'NOT_OPERATING'
    | 'OUTSIDE_BOUNDS'
    | 'PATH_NOT_FOUND'
    | 'NO_TRANSIT_TIMES'
    | 'REQUEST_TIMEOUT'
    | 'BOGUS_PARAMETER'
    | 'TOO_CLOSE'
    | 'LOCATION_NOT_ACCESSIBLE'
    | 'MISSING_MODE'
    | 'ERROR_NO_GRAPH'
    | 'PLANNER_SERVICE_UNAVAILABLE'
    | 'ERROR_VEHICLE_LOCATION_SERVICE'
    | 'ERROR_BIKE_RENTAL_SERVICE'
    | 'ERROR_TICKETING_SERVICE'
    | 'ERROR_TRANSIT_INDEX_SERVICE'
    | 'MOVED_TEMPORARILY';
  export type TransitSearch = Partial<{
    query: string;
    stopIds: Array<string | null> | null;
    routeIds: Array<string | null> | null;
    alertIds: Array<string | null> | null;
  }>;
  export type TransitAgency = Partial<{
    id: string;
    name: string;
    url: string;
    timezone: string;
    lang: string;
    phone: string;
  }>;
  export type TransitStopStyle = Partial<{
    colors: Array<string | null> | null;
    type: 'PRIORITY' | null;
    image: string | null;
  }> | null;
  export type TransitRouteStyleIcon = Partial<{
    type: 'BOX' | 'CIRCLE';
    text: string;
    textColor: string;
  }> | null;
  export type TransitVehicleStyleIcon = Partial<{ name: string | null }> | null;
  export type TransitRouteStyle = Partial<{
    color: string;
    stop: TransitStopStyle;
    icon: TransitRouteStyleIcon;
    vehicleIcon: TransitVehicleStyleIcon;
  }>;
  export type TransitRoute = Partial<{
    id: string;
    shortName: string;
    longName: string | null;
    description: string | null;
    type:
      | 'WALK'
      | 'BICYCLE'
      | 'CAR'
      | 'TRAM'
      | 'SUBWAY'
      | 'SUBURBAN_RAILWAY'
      | 'RAIL'
      | 'COACH'
      | 'BUS'
      | 'TROLLEYBUS'
      | 'FERRY'
      | 'CABLE_CAR'
      | 'GONDOLA'
      | 'FUNICULAR'
      | 'TRANSIT'
      | 'TRAINISH'
      | 'BUSISH'
      | 'LEG_SWITCH'
      | 'CUSTOM_MOTOR_VEHICLE';
    url: string | null;
    color: string;
    textColor: string;
    agencyId: string;
    iconDisplayType: string;
    iconDisplayText: string;
    bikesAllowed: boolean;
    style: TransitRouteStyle;
    sortOrder: number;
  }>;
  export type TransitStop = Partial<{
    id: string;
    vertex: string;
    lat: number;
    lon: number;
    name: string;
    code: string;
    direction: string;
    platformCode: string | null;
    description: string | null;
    locationType: number;
    locationSubType: string | null;
    parentStationId: string | null;
    type:
      | 'WALK'
      | 'BICYCLE'
      | 'CAR'
      | 'TRAM'
      | 'SUBWAY'
      | 'SUBURBAN_RAILWAY'
      | 'RAIL'
      | 'COACH'
      | 'BUS'
      | 'TROLLEYBUS'
      | 'FERRY'
      | 'CABLE_CAR'
      | 'GONDOLA'
      | 'FUNICULAR'
      | 'TRANSIT'
      | 'TRAINISH'
      | 'BUSISH'
      | 'LEG_SWITCH'
      | 'CUSTOM_MOTOR_VEHICLE'
      | null;
    wheelchairBoarding: boolean;
    routeIds: Array<string>;
    stopColorType: string | null;
    alertIds: Array<string | null> | null;
    style: TransitStopStyle;
  }>;
  export type TransitTrip = Partial<{
    id: string;
    routeId: string;
    shapeId: string;
    blockId: string | null;
    tripHeadsign: string;
    tripShortName: string | null;
    serviceId: string;
    directionId: string;
    bikesAllowed: boolean;
    wheelchairAccessible: boolean;
  }>;
  export type TranslatedString = Partial<{ translations: unknown; someTranslation: string }> | null;
  export type EffectType = 'NO_SERVICE' | 'WARNING';
  export type TransitAlertRoute = Partial<{
    routeId: string;
    stopIds: Array<string>;
    header: TranslatedString;
    effectType: EffectType;
  }>;
  export type TransitAlert = Partial<{
    id: string;
    start: number;
    end: number;
    timestamp: number;
    modifiedTime: number;
    stopIds: Array<string>;
    routeIds: Array<string>;
    url: TranslatedString;
    header: TranslatedString;
    description: TranslatedString;
    disableApp: boolean | null;
    startText: TranslatedString;
    endText: TranslatedString;
    routes: Array<TransitAlertRoute>;
  }>;
  export type TransitReferences = Partial<{
    agencies: { [key: string]: TransitAgency };
    routes: { [key: string]: TransitRoute };
    stops: { [key: string]: TransitStop };
    trips: { [key: string]: TransitTrip };
    alerts: { [key: string]: TransitAlert };
  }>;
  export type TransitEntryWithReferencesTransitSearch = Partial<{
    limitExceeded: boolean;
    entry: TransitSearch;
    references: TransitReferences;
    class: string;
  }>;
  export type AlertSearchMethodResponse = Partial<{
    currentTime: number;
    version: number;
    status: Status;
    code: number;
    text: string;
    data: TransitEntryWithReferencesTransitSearch;
  }>;
  export type TransitScheduleStopTime = Partial<{
    stopId: string;
    stopHeadsign: string;
    arrivalTime: number | null;
    departureTime: number | null;
    predictedArrivalTime: number | null;
    predictedDepartureTime: number | null;
    uncertain: boolean | null;
    tripId: string;
    serviceDate: string;
    wheelchairAccessible: boolean;
    mayRequireBooking: boolean;
    groupIds: Array<string>;
    alertIds: Array<string>;
  }>;
  export type TransitDepartureGroup = Partial<{
    routeId: string;
    headsign: string;
    stopTimes: Array<TransitScheduleStopTime>;
  }>;
  export type TransitListEntryWithReferencesTransitDepartureGroup = Partial<{
    list: Array<TransitDepartureGroup>;
    outOfRange: boolean;
    limitExceeded: boolean;
    references: TransitReferences;
    class: string;
  }>;
  export type ArrivalsAndDeparturesForLocationOTPMethodResponse = Partial<{
    currentTime: number;
    version: number;
    status: Status;
    code: number;
    text: string;
    data: TransitListEntryWithReferencesTransitDepartureGroup;
  }>;
  export type TransitArrivalsAndDepartures = Partial<{
    stopId: string;
    routeIds: Array<string>;
    alertIds: Array<string>;
    nearbyStopIds: Array<string>;
    stopTimes: Array<TransitScheduleStopTime>;
  }>;
  export type TransitEntryWithReferencesTransitArrivalsAndDepartures = Partial<{
    limitExceeded: boolean;
    entry: TransitArrivalsAndDepartures;
    references: TransitReferences;
    class: string;
  }>;
  export type ArrivalsAndDeparturesForStopOTPMethodResponse = Partial<{
    currentTime: number;
    version: number;
    status: Status;
    code: number;
    text: string;
    data: TransitEntryWithReferencesTransitArrivalsAndDepartures;
  }>;
  export type TransitBikeRentalStation = Partial<{
    id: string;
    lat: number;
    lon: number;
    name: string;
    code: string;
    type: string;
    bikes: number;
    spaces: number;
  }>;
  export type TransitListEntryWithReferencesTransitBikeRentalStation = Partial<{
    list: Array<TransitBikeRentalStation>;
    outOfRange: boolean;
    limitExceeded: boolean;
    references: TransitReferences;
    class: string;
  }>;
  export type BicycleRentalMethodResponse = Partial<{
    currentTime: number;
    version: number;
    status: Status;
    code: number;
    text: string;
    data: TransitListEntryWithReferencesTransitBikeRentalStation;
  }>;
  export type TransitMetadata = Partial<{
    time: number;
    timeZone: string;
    readableTime: string;
    validityStart: string;
    validityEnd: string;
    completeValidityStart: string;
    completeValidityEnd: string;
    lowerLeftLatitude: number;
    lowerLeftLongitude: number;
    upperRightLatitude: number;
    upperRightLongitude: number;
    boundingPolyLine: string;
    alertIds: Array<string>;
    feedIds: Array<string>;
    dayTypes: unknown;
  }>;
  export type TransitEntryWithReferencesTransitMetadata = Partial<{
    limitExceeded: boolean;
    entry: TransitMetadata;
    references: TransitReferences;
    class: string;
  }>;
  export type MetadataResponse = Partial<{
    currentTime: number;
    version: number;
    status: Status;
    code: number;
    text: string;
    data: TransitEntryWithReferencesTransitMetadata;
  }>;
  export type TransitPolyline = Partial<{ levels: string; points: string; length: number }>;
  export type TransitRouteVariant = Partial<{
    name: string;
    stopIds: Array<string>;
    mayRequireBooking: boolean;
    bookableStopIds: Array<string>;
    direction: string;
    headsign: string;
    polyline: TransitPolyline;
    routeId: string;
    type: string;
  }>;
  export type TransitRouteDetails = Partial<{
    id: string;
    shortName: string;
    longName: string | null;
    description: string | null;
    type:
      | 'WALK'
      | 'BICYCLE'
      | 'CAR'
      | 'TRAM'
      | 'SUBWAY'
      | 'SUBURBAN_RAILWAY'
      | 'RAIL'
      | 'COACH'
      | 'BUS'
      | 'TROLLEYBUS'
      | 'FERRY'
      | 'CABLE_CAR'
      | 'GONDOLA'
      | 'FUNICULAR'
      | 'TRANSIT'
      | 'TRAINISH'
      | 'BUSISH'
      | 'LEG_SWITCH'
      | 'CUSTOM_MOTOR_VEHICLE';
    url: string | null;
    color: string;
    textColor: string;
    agencyId: string;
    iconDisplayType: string;
    iconDisplayText: string;
    bikesAllowed: boolean;
    style: TransitRouteStyle;
    sortOrder: number;
    variants: Array<TransitRouteVariant>;
    alertIds: Array<string>;
  }>;
  export type TransitListEntryWithReferencesTransitRouteDetails = Partial<{
    list: Array<TransitRouteDetails>;
    outOfRange: boolean;
    limitExceeded: boolean;
    references: TransitReferences;
    class: string;
  }>;
  export type MultiRouteDetailsMethodResponse = Partial<{
    currentTime: number;
    version: number;
    status: Status;
    code: number;
    text: string;
    data: TransitListEntryWithReferencesTransitRouteDetails;
  }>;
  export type TransitCoordinatePoint = Partial<{ lat: number; lon: number }>;
  export type TransitVehicleOccupancy = Partial<{
    adults: number | null;
    children: number | null;
    strollers: number | null;
    wheelchairs: number | null;
    other: number | null;
  }> | null;
  export type TransitVehicleStyle = Partial<{ icon: TransitVehicleStyleIcon }> | null;
  export type TransitVehicle = Partial<{
    vehicleId: string;
    stopId: string;
    stopSequence: number | null;
    routeId: string;
    bearing: number;
    location: TransitCoordinatePoint;
    serviceDate: string;
    licensePlate: string;
    label: string | null;
    model: string | null;
    deviated: boolean;
    stale: boolean | null;
    lastUpdateTime: number;
    status: 'INCOMING_AT' | 'STOPPED_AT' | 'IN_TRANSIT_TO';
    congestionLevel: 'UNKNOWN' | 'CONGESTION' | null;
    vehicleRouteType:
      | 'WALK'
      | 'BICYCLE'
      | 'CAR'
      | 'TRAM'
      | 'SUBWAY'
      | 'SUBURBAN_RAILWAY'
      | 'RAIL'
      | 'COACH'
      | 'BUS'
      | 'TROLLEYBUS'
      | 'FERRY'
      | 'CABLE_CAR'
      | 'GONDOLA'
      | 'FUNICULAR'
      | 'TRANSIT'
      | 'TRAINISH'
      | 'BUSISH'
      | 'LEG_SWITCH'
      | 'CUSTOM_MOTOR_VEHICLE';
    stopDistancePercent: number;
    wheelchairAccessible: boolean;
    occupancy: TransitVehicleOccupancy;
    capacity: TransitVehicleOccupancy;
    tripId: string | null;
    vertex: string;
    style: TransitVehicleStyle;
  }>;
  export type TransitListEntryWithReferencesTransitVehicle = Partial<{
    list: Array<TransitVehicle>;
    outOfRange: boolean;
    limitExceeded: boolean;
    references: TransitReferences;
    class: string;
  }>;
  export type OnboardDepartSearchMethodResponse = Partial<{
    currentTime: number;
    version: number;
    status: Status;
    code: number;
    text: string;
    data: TransitListEntryWithReferencesTransitVehicle;
  }>;
  export type OnboardDepartPosition = {
    lat: number;
    lon: number;
    timestamp: number;
    accuracy?: number | null | undefined;
    speed?: number | null | undefined;
  };
  export type TraverseMode =
    | 'WALK'
    | 'BICYCLE'
    | 'CAR'
    | 'TRAM'
    | 'SUBWAY'
    | 'RAIL'
    | 'BUS'
    | 'FERRY'
    | 'CABLE_CAR'
    | 'GONDOLA'
    | 'FUNICULAR'
    | 'TRANSIT'
    | 'AIRPLANE'
    | 'TROLLEYBUS'
    | 'MONORAIL'
    | 'SUBURBAN_RAILWAY'
    | 'COACH';
  export type WalkProfile = 'SLOW' | 'MID' | 'FAST';
  export type ApiTripSearchMetadata = Partial<{
    searchWindowUsed: number;
    nextDateTime: number;
    prevDateTime: number;
  }>;
  export type BikeStreetCategory =
    | 'CYCLEWAY'
    | 'CYCLELANE'
    | 'LOW_TRAFFIC'
    | 'OTHER'
    | 'PEDESTRIAN'
    | null;
  export type DisplayedLeg = Partial<{
    first: boolean;
    last: boolean;
    time: number;
    walkTo: boolean;
    name: string;
  }>;
  export type ElevationPoint = Partial<{ distance: number; elevation: number | null }>;
  export type EncodedPolylineBean = Partial<{ points: string; length: number }>;
  export type TicketingPeriod = Partial<{
    dayOfWeek: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN' | 'HOL' | 'O247';
    opens: string;
    closes: string;
    opensSeconds: number;
    closesSeconds: number;
  }>;
  export type TicketingLocation = Partial<{
    id: string;
    type: 'CUSTOMER_CENTER' | 'CASHIER' | 'VENDING_MACHINE' | 'RESELLER';
    state: 'PLANNED' | 'OPERATIONAL' | 'INOPERATIVE';
    visible: boolean;
    place: string;
    address: string;
    description: string;
    operator: string;
    lat: number;
    lon: number;
    cashAccepted: boolean;
    creditCardsAccepted: boolean;
    passIdCreation: boolean;
    ticketPassExchange: boolean;
    openingPeriods: Array<TicketingPeriod>;
    products: Array<string>;
    lastModified: string;
  }>;
  export type Place = Partial<{
    name: string;
    ticketingLocation: TicketingLocation;
    stopId: string | null;
    stopCode: string | null;
    platformCode: string | null;
    lon: number | null;
    lat: number | null;
    arrival: string | null;
    departure: string | null;
    orig: string | null;
    stopIndex: number | null;
    stopSequence: number | null;
  }> | null;
  export type WalkStep = Partial<{
    distance: number;
    relativeDirection:
      | 'DEPART'
      | 'HARD_LEFT'
      | 'LEFT'
      | 'SLIGHTLY_LEFT'
      | 'CONTINUE'
      | 'SLIGHTLY_RIGHT'
      | 'RIGHT'
      | 'HARD_RIGHT'
      | 'CIRCLE_CLOCKWISE'
      | 'CIRCLE_COUNTERCLOCKWISE'
      | 'ELEVATOR'
      | 'UTURN_LEFT'
      | 'UTURN_RIGHT';
    streetName: string;
    absoluteDirection:
      | 'NORTH'
      | 'NORTHEAST'
      | 'EAST'
      | 'SOUTHEAST'
      | 'SOUTH'
      | 'SOUTHWEST'
      | 'WEST'
      | 'NORTHWEST';
    stayOn: boolean;
    area: boolean;
    bogusName: boolean;
    lon: number;
    lat: number;
    bicycleStreetDirection: 'BIDIRECTIONAL' | 'ONEWAY_WITH_TRAFFIC' | 'ONEWAY_AGAINST_TRAFFIC';
    bicycleCategory: BikeStreetCategory;
    walkingBike: boolean | null;
    geometry: EncodedPolylineBean;
  }> | null;
  export type Leg = Partial<{
    startTime: string;
    endTime: string;
    departureDelay: number;
    arrivalDelay: number;
    realTime: boolean;
    distance: number;
    pathway: boolean;
    mode: string;
    agencyName: string | null;
    agencyUrl: string | null;
    agencyTimeZoneOffset: number | null;
    routeColor: string | null;
    routeId: string | null;
    routeTextColor: string | null;
    interlineWithPreviousLeg: boolean | null;
    tripBlockId: string | null;
    headsign: string | null;
    agencyId: string | null;
    tripId: string | null;
    serviceDate: string | null;
    from: Place;
    to: Place;
    legGeometry: EncodedPolylineBean;
    legElevation: Array<ElevationPoint>;
    alertIds: Array<string>;
    routeShortName: string | null;
    routeLongName: string | null;
    boardRule: string | null;
    alightRule: string | null;
    rentedBike: boolean | null;
    wait: 'SHORT' | 'LONG' | null;
    routeIds: Array<string | null> | null;
    tripIds: Array<string | null> | null;
    hasAlertInPattern: boolean | null;
    generalizedCost: number;
    requiresBooking: boolean;
    onBoardAccess: boolean | null;
    vertex: string;
    duration: number;
    timeZone: Partial<{ displayName: string; id: string; dstsavings: number; rawOffset: number }>;
    transitLeg: boolean;
    intermediateStops: Array<Place> | null;
    steps: Array<WalkStep> | null;
  }>;
  export type PatternStatistics = Partial<{ min: number; max: number; avg: number; text: string }>;
  export type Itinerary = Partial<{
    duration: number;
    startTime: string;
    endTime: string;
    walkTime: number;
    bikeTime: number;
    transitTime: number;
    waitingTime: number;
    bikeDistance: number;
    walkDistance: number;
    walkLimitExceeded: boolean;
    notAllTicketsAvailable: boolean;
    bikeCategoryDistances: unknown;
    elevationLost: number;
    elevationGained: number;
    transfers: number;
    generalizedCost: number;
    waitTimeAdjustedGeneralizedCost: number;
    legs: Array<Leg>;
    displayedLegs: Array<DisplayedLeg>;
    tooSloped: boolean;
    patternItineraries: Array<Itinerary>;
    patternFrequency: PatternStatistics;
    patternDuration: PatternStatistics;
    displayProductRecommendation: boolean;
  }>;
  export type TripPlan = Partial<{
    date: string;
    from: Place;
    to: Place;
    itineraries: Array<Itinerary>;
  }>;
  export type PlannerError = Partial<{
    id: number;
    message:
      | 'PLAN_OK'
      | 'SYSTEM_ERROR'
      | 'GRAPH_UNAVAILABLE'
      | 'PLANNER_SERVICE_UNAVAILABLE'
      | 'OUTSIDE_BOUNDS'
      | 'PATH_NOT_FOUND'
      | 'NO_TRANSIT_TIMES'
      | 'REQUEST_TIMEOUT'
      | 'BOGUS_PARAMETER'
      | 'GEOCODE_FROM_NOT_FOUND'
      | 'GEOCODE_TO_NOT_FOUND'
      | 'GEOCODE_FROM_TO_NOT_FOUND'
      | 'TOO_CLOSE'
      | 'LOCATION_NOT_ACCESSIBLE'
      | 'MISSING_MODE'
      | 'GEOCODE_FROM_AMBIGUOUS'
      | 'GEOCODE_TO_AMBIGUOUS'
      | 'GEOCODE_FROM_TO_AMBIGUOUS'
      | 'UNDERSPECIFIED_TRIANGLE'
      | 'TRIANGLE_NOT_AFFINE'
      | 'TRIANGLE_OPTIMIZE_TYPE_NOT_SET'
      | 'TRIANGLE_VALUES_NOT_SET';
    missing: Array<string>;
    noPath: boolean;
    msgFromMessage:
      | 'PLAN_OK'
      | 'SYSTEM_ERROR'
      | 'GRAPH_UNAVAILABLE'
      | 'PLANNER_SERVICE_UNAVAILABLE'
      | 'OUTSIDE_BOUNDS'
      | 'PATH_NOT_FOUND'
      | 'NO_TRANSIT_TIMES'
      | 'REQUEST_TIMEOUT'
      | 'BOGUS_PARAMETER'
      | 'GEOCODE_FROM_NOT_FOUND'
      | 'GEOCODE_TO_NOT_FOUND'
      | 'GEOCODE_FROM_TO_NOT_FOUND'
      | 'TOO_CLOSE'
      | 'LOCATION_NOT_ACCESSIBLE'
      | 'MISSING_MODE'
      | 'GEOCODE_FROM_AMBIGUOUS'
      | 'GEOCODE_TO_AMBIGUOUS'
      | 'GEOCODE_FROM_TO_AMBIGUOUS'
      | 'UNDERSPECIFIED_TRIANGLE'
      | 'TRIANGLE_NOT_AFFINE'
      | 'TRIANGLE_OPTIMIZE_TYPE_NOT_SET'
      | 'TRIANGLE_VALUES_NOT_SET';
  }> | null;
  export type Response = Partial<{
    requestParameters: unknown;
    plan: TripPlan;
    metadata: ApiTripSearchMetadata;
    error: PlannerError;
  }>;
  export type TransitEntryWithReferencesResponse = Partial<{
    limitExceeded: boolean;
    entry: Response;
    references: TransitReferences;
    class: string;
  }>;
  export type PlanTripResponse = Partial<{
    currentTime: number;
    version: number;
    status: Status;
    code: number;
    text: string;
    data: TransitEntryWithReferencesResponse;
  }>;
  export type ReferencesMethodErrors = Partial<{
    agencyIds: Array<string>;
    alertIds: Array<string>;
    routeIds: Array<string>;
    stopIds: Array<string>;
  }>;
  export type ReferencesMethodResult = Partial<{ errors: ReferencesMethodErrors }>;
  export type ReferencesMethodResponse = Partial<{
    limitExceeded: boolean;
    entry: ReferencesMethodResult;
    references: TransitReferences;
    class: string;
  }>;
  export type TransitListEntryWithReferencesTransitRoute = Partial<{
    list: Array<TransitRoute>;
    outOfRange: boolean;
    limitExceeded: boolean;
    references: TransitReferences;
    class: string;
  }>;
  export type RouteDetailsForStopMethodResponse = Partial<{
    currentTime: number;
    version: number;
    status: Status;
    code: number;
    text: string;
    data: TransitListEntryWithReferencesTransitRoute;
  }>;
  export type TransitEntryWithReferencesTransitRouteDetails = Partial<{
    limitExceeded: boolean;
    entry: TransitRouteDetails;
    references: TransitReferences;
    class: string;
  }>;
  export type RouteDetailsMethodResponse = Partial<{
    currentTime: number;
    version: number;
    status: Status;
    code: number;
    text: string;
    data: TransitEntryWithReferencesTransitRouteDetails;
  }>;
  export type TransitScheduleGroup = Partial<{
    groupId: string;
    headsign: string;
    description: string;
  }>;
  export type TransitRouteScheduleForDirection = Partial<{
    directionId: string;
    groups: unknown;
    stopTimes: Array<TransitScheduleStopTime>;
  }>;
  export type TransitRouteSchedule = Partial<{
    routeId: string;
    alertIds: Array<string>;
    directions: Array<TransitRouteScheduleForDirection>;
  }>;
  export type TransitSchedule = Partial<{
    stopId: string;
    serviceDate: string;
    date: string;
    routeIds: Array<string>;
    nearbyStopIds: Array<string>;
    alertIds: Array<string>;
    schedules: Array<TransitRouteSchedule>;
  }>;
  export type TransitEntryWithReferencesTransitSchedule = Partial<{
    limitExceeded: boolean;
    entry: TransitSchedule;
    references: TransitReferences;
    class: string;
  }>;
  export type ScheduleForStopOTPMethodResponse = Partial<{
    currentTime: number;
    version: number;
    status: Status;
    code: number;
    text: string;
    data: TransitEntryWithReferencesTransitSchedule;
  }>;
  export type SearchMethodResponse = Partial<{
    currentTime: number;
    version: number;
    status: Status;
    code: number;
    text: string;
    data: TransitEntryWithReferencesTransitSearch;
  }>;
  export type StatisticsResponse = Partial<{ result: string }>;
  export type TransitListEntryWithReferencesTransitStop = Partial<{
    list: Array<TransitStop>;
    outOfRange: boolean;
    limitExceeded: boolean;
    references: TransitReferences;
    class: string;
  }>;
  export type StopsForLocationResponse = Partial<{
    currentTime: number;
    version: number;
    status: Status;
    code: number;
    text: string;
    data: TransitListEntryWithReferencesTransitStop;
  }>;
  export type TicketingProduct = Partial<{
    id: string;
    groupId: string;
    groupName: string;
    name: string;
    url: string;
    price: string;
    visible: boolean;
    lastModified: string;
  }>;
  export type TransitTicketing = Partial<{
    lastModifiedTime: number;
    oldestModifiedTime: number;
    locations: Array<TicketingLocation>;
    products: Array<TicketingProduct>;
  }>;
  export type TransitEntryWithReferencesTransitTicketing = Partial<{
    limitExceeded: boolean;
    entry: TransitTicketing;
    references: TransitReferences;
    class: string;
  }>;
  export type TicketingMethodResponse = Partial<{
    currentTime: number;
    version: number;
    status: Status;
    code: number;
    text: string;
    data: TransitEntryWithReferencesTransitTicketing;
  }>;
  export type TransitTripStopTime = Partial<{
    stopId: string;
    stopHeadsign: string;
    arrivalTime: number | null;
    departureTime: number | null;
    predictedArrivalTime: number | null;
    predictedDepartureTime: number | null;
    uncertain: boolean | null;
    requiresBooking: boolean;
    stopSequence: number;
    shapeDistTraveled: number;
  }>;
  export type TransitTripDetailsOTP = Partial<{
    tripId: string;
    serviceDate: string;
    vertex: string;
    vehicle: TransitVehicle;
    polyline: TransitPolyline;
    alertIds: Array<string>;
    stopTimes: Array<TransitTripStopTime>;
    nextBlockTripId: string | null;
    mayRequireBooking: boolean;
  }>;
  export type TransitEntryWithReferencesTransitTripDetailsOTP = Partial<{
    limitExceeded: boolean;
    entry: TransitTripDetailsOTP;
    references: TransitReferences;
    class: string;
  }>;
  export type TripDetailsOTPMethodResponse = Partial<{
    currentTime: number;
    version: number;
    status: Status;
    code: number;
    text: string;
    data: TransitEntryWithReferencesTransitTripDetailsOTP;
  }>;
  export type VehicleForTripMethodResponse = Partial<{
    currentTime: number;
    version: number;
    status: Status;
    code: number;
    text: string;
    data: TransitListEntryWithReferencesTransitVehicle;
  }>;
  export type VehiclesForLocationMethodResponse = Partial<{
    currentTime: number;
    version: number;
    status: Status;
    code: number;
    text: string;
    data: TransitListEntryWithReferencesTransitVehicle;
  }>;
  export type VehiclesForRouteMethodResponse = Partial<{
    currentTime: number;
    version: number;
    status: Status;
    code: number;
    text: string;
    data: TransitListEntryWithReferencesTransitVehicle;
  }>;
  export type VehiclesForStopMethodResponse = Partial<{
    currentTime: number;
    version: number;
    status: Status;
    code: number;
    text: string;
    data: TransitListEntryWithReferencesTransitVehicle;
  }>;

  // </Schemas>
}

export namespace Endpoints {
  // <Endpoints>

  export type get_SearchAlerts = {
    method: 'GET';
    path: '/{dialect}/api/where/alert-search';
    parameters: {
      query: Partial<{
        query: string;
        start: number;
        end: number;
        minResult: number;
        appVersion: string;
        version: '2' | '3' | '4';
        includeReferences: Array<Schemas.ReferencesSchema>;
      }>;
      path?: { dialect: 'otp' | 'mobile' };
    };
    response: Schemas.AlertSearchMethodResponse;
  };
  export type get_GetArrivalsAndDeparturesForLocation = {
    method: 'GET';
    path: '/{dialect}/api/where/arrivals-and-departures-for-location';
    parameters: {
      query: Partial<{
        groupLimit: number;
        clientLon: number;
        clientLat: number;
        minutesBefore: number;
        minutesAfter: number;
        stopId: Array<string>;
        includeRouteId: Array<string>;
        time: number;
        onlyDepartures: boolean;
        limit: number;
        lat: number;
        lon: number;
        latSpan: number;
        lonSpan: number;
        radius: number;
        query: string;
        minResult: number;
        appVersion: string;
        version: '2' | '3' | '4';
        includeReferences: Array<Schemas.ReferencesSchema>;
      }>;
      path?: { dialect: 'otp' | 'mobile' };
    };
    response: Schemas.ArrivalsAndDeparturesForLocationOTPMethodResponse;
  };
  export type get_GetArrivalsAndDeparturesForStop = {
    method: 'GET';
    path: '/{dialect}/api/where/arrivals-and-departures-for-stop';
    parameters: {
      query: Partial<{
        minutesBefore: number;
        minutesAfter: number;
        stopId: Array<string>;
        includeRouteId: Array<string>;
        time: number;
        onlyDepartures: boolean;
        limit: number;
        lat: number;
        lon: number;
        latSpan: number;
        lonSpan: number;
        radius: number;
        query: string;
        minResult: number;
        appVersion: string;
        version: '2' | '3' | '4';
        includeReferences: Array<Schemas.ReferencesSchema>;
      }>;
      path?: { dialect: 'otp' | 'mobile' };
    };
    response: Schemas.ArrivalsAndDeparturesForStopOTPMethodResponse;
  };
  export type get_GetBicycleRentalStations = {
    method: 'GET';
    path: '/{dialect}/api/where/bicycle-rental';
    parameters: {
      query: Partial<{
        appVersion: string;
        version: '2' | '3' | '4';
        includeReferences: Array<Schemas.ReferencesSchema>;
      }>;
      path?: { dialect: 'otp' | 'mobile' };
    };
    response: Schemas.BicycleRentalMethodResponse;
  };
  export type get_BookingRedirect = {
    method: 'GET';
    path: '/{dialect}/api/where/booking-redirect';
    parameters: {
      query: Partial<{
        routeId: string;
        directionId: string;
        tripId: string;
        serviceDate: string;
        boardStopId: string;
        alightStopId: string;
        version: '2' | '3' | '4';
        appVersion: string;
      }>;
      path?: { dialect: 'otp' | 'mobile' };
    };
    response: unknown;
  };
  export type get_GetMetadata = {
    method: 'GET';
    path: '/{dialect}/api/where/metadata';
    parameters: {
      query: Partial<{
        time: number;
        appVersion: string;
        version: '2' | '3' | '4';
        includeReferences: Array<Schemas.ReferencesSchema>;
      }>;
      path?: { dialect: 'otp' | 'mobile' };
    };
    response: Schemas.MetadataResponse;
  };
  export type get_GetMultiRouteDetails = {
    method: 'GET';
    path: '/{dialect}/api/where/multi-route-details';
    parameters: {
      query: {
        routeId: Array<string>;
        date: string;
        related: boolean;
        appVersion: string;
        version: '2' | '3' | '4';
        includeReferences: Array<Schemas.ReferencesSchema>;
      };
      path?: { dialect: 'otp' | 'mobile' };
    };
    response: Schemas.MultiRouteDetailsMethodResponse;
  };
  export type post_SearchForOnboardDepartVehicles = {
    method: 'POST';
    path: '/{dialect}/api/where/onboard-depart-search';
    parameters: {
      query: Partial<{
        appVersion: string;
        version: '2' | '3' | '4';
        includeReferences: Array<Schemas.ReferencesSchema>;
      }>;
      path?: { dialect: 'otp' | 'mobile' };
      body: Array<Schemas.OnboardDepartPosition>;
    };
    response: Schemas.OnboardDepartSearchMethodResponse;
  };
  export type get_PlanTrip = {
    method: 'GET';
    path: '/{dialect}/api/where/plan-trip';
    parameters: {
      query: {
        version: '2' | '3' | '4';
        appVersion: string;
        includeReferences: Array<Schemas.ReferencesSchema>;
        date: string;
        time: string;
        fromPlace: string;
        toPlace: string;
        mode: Array<Schemas.TraverseMode>;
        shouldBuyTickets: boolean;
        showIntermediateStops: boolean;
        arriveBy: boolean;
        wheelchair: boolean;
        triangleSafetyFactor: number;
        triangleSlopeFactor: number;
        triangleTimeFactor: number;
        optimize: 'BEST' | 'WALK' | 'TRANSFERS';
        walkProfile: 'SLOW' | 'MID' | 'FAST';
        numItineraries: number;
      };
      path?: { dialect: 'otp' | 'mobile' };
    };
    response: Schemas.PlanTripResponse;
  };
  export type get_PlanAccess = {
    method: 'GET';
    path: '/{dialect}/api/where/plan-access';
    parameters: {
      query: {
        version: '2' | '3' | '4';
        appVersion: string;
        includeReferences: Array<Schemas.ReferencesSchema>;
        date: string;
        time: string;
        fromPlace: string;
        toPlace: string;
        mode: Array<Schemas.TraverseMode>;
        shouldBuyTickets: boolean;
        showIntermediateStops: boolean;
        arriveBy: boolean;
        wheelchair: boolean;
        triangleSafetyFactor: number;
        triangleSlopeFactor: number;
        triangleTimeFactor: number;
        optimize: 'BEST' | 'WALK' | 'TRANSFERS';
        walkProfile: 'SLOW' | 'MID' | 'FAST';
        numItineraries: number;
      };
      path?: { dialect: 'otp' | 'mobile' };
    };
    response: Schemas.PlanTripResponse;
  };
  export type get_GetReferences = {
    method: 'GET';
    path: '/{dialect}/api/where/references';
    parameters: {
      query: Partial<{
        agencyId: Array<string>;
        alertId: Array<string>;
        routeId: Array<string>;
        stopId: Array<string>;
        appVersion: string;
        version: '2' | '3' | '4';
        includeReferences: Array<Schemas.ReferencesSchema>;
      }>;
      path?: { dialect: 'otp' | 'mobile' };
    };
    response: Schemas.ReferencesMethodResponse;
  };
  export type get_GetRouteDetailsForStop = {
    method: 'GET';
    path: '/{dialect}/api/where/route-details-for-stop';
    parameters: {
      query: Partial<{
        stopId: string;
        appVersion: string;
        version: '2' | '3' | '4';
        includeReferences: Array<Schemas.ReferencesSchema>;
      }>;
      path?: { dialect: 'otp' | 'mobile' };
    };
    response: Schemas.RouteDetailsForStopMethodResponse;
  };
  export type get_GetRouteDetails = {
    method: 'GET';
    path: '/{dialect}/api/where/route-details';
    parameters: {
      query: {
        routeId: string;
        date: string;
        related: boolean;
        appVersion: string;
        version: '2' | '3' | '4';
        includeReferences: Array<Schemas.ReferencesSchema>;
      };
      path?: { dialect: 'otp' | 'mobile' };
    };
    response: Schemas.RouteDetailsMethodResponse;
  };
  export type get_GetScheduleForStop = {
    method: 'GET';
    path: '/{dialect}/api/where/schedule-for-stop';
    parameters: {
      query: Partial<{
        stopId: Array<string>;
        date: string;
        onlyDepartures: boolean;
        appVersion: string;
        version: '2' | '3' | '4';
        includeReferences: Array<Schemas.ReferencesSchema>;
      }>;
      path?: { dialect: 'otp' | 'mobile' };
    };
    response: Schemas.ScheduleForStopOTPMethodResponse;
  };
  export type get_Search = {
    method: 'GET';
    path: '/{dialect}/api/where/search';
    parameters: {
      query: Partial<{
        query: string;
        lat: number;
        lon: number;
        minResult: number;
        appVersion: string;
        version: '2' | '3' | '4';
        includeReferences: Array<Schemas.ReferencesSchema>;
      }>;
      path?: { dialect: 'otp' | 'mobile' };
    };
    response: Schemas.SearchMethodResponse;
  };
  export type get_GetStatistics = {
    method: 'GET';
    path: '/{dialect}/api/where/statistics';
    parameters: {
      path?: { dialect: 'otp' | 'mobile' };
    };
    response: Schemas.StatisticsResponse;
  };
  export type get_GetStopsForLocation = {
    method: 'GET';
    path: '/{dialect}/api/where/stops-for-location';
    parameters: {
      query: Partial<{
        lat: number;
        lon: number;
        latSpan: number;
        lonSpan: number;
        radius: number;
        query: string;
        minResult: number;
        appVersion: string;
        version: '2' | '3' | '4';
        includeReferences: Array<Schemas.ReferencesSchema>;
      }>;
      path?: { dialect: 'otp' | 'mobile' };
    };
    response: Schemas.StopsForLocationResponse;
  };
  export type get_GetTicketingData = {
    method: 'GET';
    path: '/{dialect}/api/where/ticketing-locations';
    parameters: {
      query: Partial<{
        ifModifiedSince: number;
        full: boolean;
        appVersion: string;
        version: '2' | '3' | '4';
        includeReferences: Array<Schemas.ReferencesSchema>;
      }>;
      path?: { dialect: 'otp' | 'mobile' };
      header: Partial<{ 'If-Modified-Since': string }>;
    };
    response: Schemas.TicketingMethodResponse;
  };
  export type get_GetTripDetails = {
    method: 'GET';
    path: '/{dialect}/api/where/trip-details';
    parameters: {
      query: Partial<{
        vehicleId: string;
        tripId: string;
        date: string;
        ifModifiedSince: number;
        appVersion: string;
        version: '2' | '3' | '4';
        includeReferences: Array<Schemas.ReferencesSchema>;
      }>;
      path?: { dialect: 'otp' | 'mobile' };
      header?: Partial<{ 'If-Modified-Since': string }>;
    };
    response: Schemas.TripDetailsOTPMethodResponse;
  };
  export type get_GetVehicleForTrip = {
    method: 'GET';
    path: '/{dialect}/api/where/vehicle-for-trip';
    parameters: {
      query: {
        tripId: Array<string>;
        date: Array<string>;
        ifModifiedSince: number;
        appVersion: string;
        version: '2' | '3' | '4';
        includeReferences: Array<Schemas.ReferencesSchema>;
      };
      path?: { dialect: 'otp' | 'mobile' };
      header: Partial<{ 'If-Modified-Since': string }>;
    };
    response: Schemas.VehicleForTripMethodResponse;
  };
  export type get_GetVehiclesForLocation = {
    method: 'GET';
    path: '/{dialect}/api/where/vehicles-for-location';
    parameters: {
      query: Partial<{
        query: string;
        lat: number;
        lon: number;
        latSpan: number;
        lonSpan: number;
        radius: number;
        ifModifiedSince: number;
        appVersion: string;
        version: '2' | '3' | '4';
        includeReferences: Array<Schemas.ReferencesSchema>;
      }>;
      path?: { dialect: 'otp' | 'mobile' };
      header: Partial<{ 'If-Modified-Since': string }>;
    };
    response: Schemas.VehiclesForLocationMethodResponse;
  };
  export type get_GetVehiclesForRoute = {
    method: 'GET';
    path: '/{dialect}/api/where/vehicles-for-route';
    parameters: {
      query: {
        routeId: Array<string>;
        related: boolean;
        ifModifiedSince: number;
        appVersion: string;
        version: '2' | '3' | '4';
        includeReferences: Array<Schemas.ReferencesSchema>;
      };
      path?: { dialect: 'otp' | 'mobile' };
      header: Partial<{ 'If-Modified-Since': string }>;
    };
    response: Schemas.VehiclesForRouteMethodResponse;
  };
  export type get_GetVehiclesForStop = {
    method: 'GET';
    path: '/{dialect}/api/where/vehicles-for-stop';
    parameters: {
      query: {
        stopId: string;
        ifModifiedSince: number;
        appVersion: string;
        version: '2' | '3' | '4';
        includeReferences: Array<Schemas.ReferencesSchema>;
      };
      path?: { dialect: 'otp' | 'mobile' };
      header: Partial<{ 'If-Modified-Since': string }>;
    };
    response: Schemas.VehiclesForStopMethodResponse;
  };

  // </Endpoints>
}

// <EndpointByMethod>
export type EndpointByMethod = {
  get: {
    '/{dialect}/api/where/alert-search': Endpoints.get_SearchAlerts;
    '/{dialect}/api/where/arrivals-and-departures-for-location': Endpoints.get_GetArrivalsAndDeparturesForLocation;
    '/{dialect}/api/where/arrivals-and-departures-for-stop': Endpoints.get_GetArrivalsAndDeparturesForStop;
    '/{dialect}/api/where/bicycle-rental': Endpoints.get_GetBicycleRentalStations;
    '/{dialect}/api/where/booking-redirect': Endpoints.get_BookingRedirect;
    '/{dialect}/api/where/metadata': Endpoints.get_GetMetadata;
    '/{dialect}/api/where/multi-route-details': Endpoints.get_GetMultiRouteDetails;
    '/{dialect}/api/where/plan-trip': Endpoints.get_PlanTrip;
    '/{dialect}/api/where/plan-access': Endpoints.get_PlanAccess;
    '/{dialect}/api/where/references': Endpoints.get_GetReferences;
    '/{dialect}/api/where/route-details-for-stop': Endpoints.get_GetRouteDetailsForStop;
    '/{dialect}/api/where/route-details': Endpoints.get_GetRouteDetails;
    '/{dialect}/api/where/schedule-for-stop': Endpoints.get_GetScheduleForStop;
    '/{dialect}/api/where/search': Endpoints.get_Search;
    '/{dialect}/api/where/statistics': Endpoints.get_GetStatistics;
    '/{dialect}/api/where/stops-for-location': Endpoints.get_GetStopsForLocation;
    '/{dialect}/api/where/ticketing-locations': Endpoints.get_GetTicketingData;
    '/{dialect}/api/where/trip-details': Endpoints.get_GetTripDetails;
    '/{dialect}/api/where/vehicle-for-trip': Endpoints.get_GetVehicleForTrip;
    '/{dialect}/api/where/vehicles-for-location': Endpoints.get_GetVehiclesForLocation;
    '/{dialect}/api/where/vehicles-for-route': Endpoints.get_GetVehiclesForRoute;
    '/{dialect}/api/where/vehicles-for-stop': Endpoints.get_GetVehiclesForStop;
  };
  post: {
    '/{dialect}/api/where/onboard-depart-search': Endpoints.post_SearchForOnboardDepartVehicles;
  };
};

// </EndpointByMethod>

// <EndpointByMethod.Shorthands>
export type GetEndpoints = EndpointByMethod['get'];
export type PostEndpoints = EndpointByMethod['post'];
export type AllEndpoints = EndpointByMethod[keyof EndpointByMethod];
// </EndpointByMethod.Shorthands>

// <ApiClientTypes>
export type EndpointParameters = {
  body?: unknown;
  query?: Record<string, unknown>;
  header?: Record<string, unknown>;
  path?: Record<string, unknown>;
};

export type MutationMethod = 'post' | 'put' | 'patch' | 'delete';
export type Method = 'get' | 'head' | MutationMethod;

export type DefaultEndpoint = {
  parameters?: EndpointParameters | undefined;
  response: unknown;
};

export type Endpoint<TConfig extends DefaultEndpoint = DefaultEndpoint> = {
  operationId: string;
  method: Method;
  path: string;
  parameters?: TConfig['parameters'];
  meta: {
    alias: string;
    hasParameters: boolean;
    areParametersRequired: boolean;
  };
  response: TConfig['response'];
};

type Fetcher = (
  method: Method,
  url: string,
  parameters?: EndpointParameters | undefined
) => Promise<Endpoint['response']>;

type RequiredKeys<T> = {
  [P in keyof T]-?: undefined extends T[P] ? never : P;
}[keyof T];

type MaybeOptionalArg<T> = RequiredKeys<T> extends never ? [config?: T] : [config: T];

// </ApiClientTypes>

// <ApiClient>
export class ApiClient {
  baseUrl: string = '';

  constructor(public fetcher: Fetcher) {}

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
    return this;
  }

  // <ApiClient.get>
  get<Path extends keyof GetEndpoints, TEndpoint extends GetEndpoints[Path]>(
    path: Path,
    ...params: MaybeOptionalArg<TEndpoint['parameters']>
  ): Promise<TEndpoint['response']> {
    return this.fetcher('get', this.baseUrl + path, params[0]);
  }
  // </ApiClient.get>

  // FIXME but we don't need this at the moment
  // <ApiClient.post>
  // post<Path extends keyof PostEndpoints, TEndpoint extends PostEndpoints[Path]>(
  //   path: Path,
  //   ...params: MaybeOptionalArg<TEndpoint['parameters']>
  // ): Promise<TEndpoint['response']> {
  //   return this.fetcher('post', this.baseUrl + path, params[0]);
  // }
  // </ApiClient.post>
}

export function createApiClient(fetcher: Fetcher, baseUrl?: string) {
  return new ApiClient(fetcher).setBaseUrl(baseUrl ?? '');
}

export function futarClient(fetcher: typeof window.fetch) {
  return createApiClient(async (method, url, params) => {
    // FIXME this can be dynamic
    const newUrl = url.replace('{dialect}', 'otp');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const searchParams = new URLSearchParams(params?.query as any);
    searchParams.set('key', PUBLIC_BKK_API_KEY);
    const response = await fetcher(newUrl + '?' + searchParams.toString(), { method });
    return await response.json();
  }, 'https://futar.bkk.hu/api/query/v1/ws');
}
