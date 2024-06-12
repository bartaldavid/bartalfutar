import type { components } from '$lib/schema-generated';
import { sql } from 'drizzle-orm';
import type { ProviderType } from '@auth/sveltekit/providers';
import { integer, primaryKey, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Auth.js tables
type AdapterAccountType = Extract<ProviderType, 'oauth' | 'oidc' | 'email' | 'webauthn'>;

export const users = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
  image: text('image')
});

export const accounts = sqliteTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state')
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId]
    })
  })
);

export const sessions = sqliteTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: integer('expires', { mode: 'timestamp_ms' }).notNull()
});

export const verificationTokens = sqliteTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: integer('expires', { mode: 'timestamp_ms' }).notNull()
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
  })
);

// bartalfutar data

export const stops = sqliteTable('stops', {
  id: text('id').primaryKey(),
  name: text('name'),
  code: text('code'),
  lat: real('lat'),
  lon: real('lon'),
  direction: text('direction'),
  platformCode: text('platform_code'),
  description: text('description'),
  locationType: integer('location_type'),
  locationSubType: text('location_sub_type'),
  parentStationId: text('parent_station_id'),
  type: text('type').$type<components['schemas']['TransitStop']['type']>(),
  wheelchairBoarding: integer('wheelchair_boarding', { mode: 'boolean' }),
  stopColorType: text('stopColorType'),
  style: text('style', { mode: 'json' }).$type<components['schemas']['TransitStopStyle']>()
});

export const routes = sqliteTable('routes', {
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
  bikesAllowed: integer('bikes_allowed', { mode: 'boolean' }),
  style: text('style', { mode: 'json' }).$type<components['schemas']['TransitRouteStyle']>(),
  sortOrder: integer('sort_order')
});

export const favoriteStops = sqliteTable(
  'favorite_stops',
  {
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`),
    stopId: text('stop_id')
      .notNull()
      .references(() => stops.id),
    userId: text('user_id')
      .notNull()
      .references(() => users.id)
  },
  (table) => ({
    pk: primaryKey({ columns: [table.stopId, table.userId] })
  })
);

export const stopsRoutes = sqliteTable(
  'stops_routes',
  {
    stopId: text('stop_id').references(() => stops.id),
    routeId: text('route_id').references(() => routes.id)
  },
  (table) => ({
    pk: primaryKey({ columns: [table.stopId, table.routeId] })
  })
);
