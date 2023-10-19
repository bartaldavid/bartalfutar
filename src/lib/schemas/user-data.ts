import type { components } from '$lib/data/bkk-openapi';

import { pgTable, text, boolean, jsonb, integer, doublePrecision, date } from 'drizzle-orm/pg-core';
import { users } from './auth';

export const stops = pgTable('stops', {
  id: text('id').primaryKey(),
  name: text('name'),
  code: text('code'),
  lat: doublePrecision('lat'),
  lon: doublePrecision('lon'),
  direction: text('direction'),
  platformCode: integer('platform_code'),
  description: text('description'),
  locationType: text('location_type'),
  locationSubType: text('location_sub_type'),
  parentStationId: text('parent_station_id'),
  type: text('type').$type<components['schemas']['TransitStop']['type']>(),
  wheelchairBoarding: boolean('wheelchair_boarding'),
  routeIds: text('routeIds').array(),
  stopColorType: text('stopColorType'),
  alertIds: text('alertIds').array(),
  style: jsonb('style').$type<components['schemas']['TransitStopStyle']>()
});

export const routes = pgTable('routes', {
  id: text('id').primaryKey(),
  shortName: text('short_name'),
  longName: text('long_name'),
  description: text('description'),
  type: text('type').$type<components['schemas']['TransitRoute']['type']>(),
  url: text('url'),
  color: text('color'),
  textColor: text('text_color'),
  agencyId: text('agency_id'),
  iconDisplayType: text('icon_display_type'),
  iconDisplayText: text('icon_display_text'),
  bikesAllowed: boolean('bikes_allowed'),
  style: jsonb('style').$type<components['schemas']['TransitRouteStyle']>(),
  sortOrder: integer('sort_order')
});

export const favoriteStops = pgTable('favorite_stops', {
  id: text('id').notNull().primaryKey(),
  createdAt: date('created_at').notNull().default('now()'),
  stopId: text('stop_id')
    .notNull()
    .references(() => stops.id),
  userId: text('user_id')
    .notNull()
    .references(() => users.id)
});
