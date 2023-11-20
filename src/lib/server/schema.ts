import {
  int,
  timestamp,
  mysqlTable,
  primaryKey,
  varchar,
  boolean,
  json,
  datetime,
  double,
  index
} from 'drizzle-orm/mysql-core';
import type { AdapterAccount } from '@auth/core/adapters';
import type { components } from '$lib/data/bkk-openapi';
import { relations, sql } from 'drizzle-orm';

export const stops = mysqlTable('stops', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }),
  code: varchar('code', { length: 255 }),
  lat: double('lat'),
  lon: double('lon'),
  // FIXME type
  direction: varchar('direction', { length: 4 }),
  platformCode: varchar('platform_code', { length: 255 }),
  description: varchar('description', { length: 255 }),
  locationType: int('location_type'),
  locationSubType: varchar('location_sub_type', { length: 255 }),
  parentStationId: varchar('parent_station_id', { length: 255 }),
  type: varchar('type', { length: 255 }).$type<components['schemas']['TransitStop']['type']>(),
  wheelchairBoarding: boolean('wheelchair_boarding'),
  stopColorType: varchar('stopColorType', { length: 255 }),
  style: json('style').$type<components['schemas']['TransitStopStyle']>()
});

export const routes = mysqlTable('routes', {
  id: varchar('id', { length: 255 }).primaryKey(),
  shortName: varchar('short_name', { length: 255 }),
  longName: varchar('long_name', { length: 255 }),
  description: varchar('description', { length: 255 }),
  type: varchar('type', { length: 255 }).$type<components['schemas']['TransitRoute']['type']>(),
  url: varchar('url', { length: 255 }),
  color: varchar('color', { length: 6 }),
  textColor: varchar('text_color', { length: 6 }),
  agencyId: varchar('agency_id', { length: 255 }),
  iconDisplayType: varchar('icon_display_type', { length: 255 }),
  iconDisplayText: varchar('icon_display_text', { length: 255 }),
  bikesAllowed: boolean('bikes_allowed'),
  style: json('style').$type<components['schemas']['TransitRouteStyle']>(),
  sortOrder: int('sort_order')
});

export const favoriteStops = mysqlTable(
  'favorite_stops',
  {
    createdAt: datetime('created_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    stopId: varchar('stop_id', { length: 255 }).notNull(),
    userId: varchar('user_id', { length: 255 }).notNull()
  },
  (stop) => ({
    userIndex: index('user_index').on(stop.userId),
    stopIndex: index('stop_index').on(stop.stopId),
    compoundKey: primaryKey(stop.userId, stop.stopId)
  })
);

export const favoriteRelations = relations(favoriteStops, ({ one }) => ({
  user: one(users, { fields: [favoriteStops.userId], references: [users.id] }),
  stop: one(stops, { fields: [favoriteStops.stopId], references: [stops.id] })
}));

export const stopsRoutes = mysqlTable(
  'stops_routes',
  {
    stopId: varchar('stop_id', { length: 255 }).notNull(),
    routeId: varchar('route_id', { length: 255 }).notNull()
  },
  (sr) => ({
    compoundKey: primaryKey(sr.stopId, sr.routeId),
    stopIndex: index('stop_index').on(sr.stopId),
    routeIndex: index('route_index').on(sr.routeId)
  })
);

export const stopsRoutesRelations = relations(stopsRoutes, ({ one }) => ({
  stop: one(stops, { fields: [stopsRoutes.stopId], references: [stops.id] }),
  route: one(routes, { fields: [stopsRoutes.routeId], references: [routes.id] })
}));

/*
Auth.js tables
*/

export const users = mysqlTable('user', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('emailVerified', {
    mode: 'date',
    fsp: 3
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar('image', { length: 255 })
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts)
}));

export const accounts = mysqlTable(
  'account',
  {
    userId: varchar('userId', { length: 255 }).notNull(),
    type: varchar('type', { length: 255 }).$type<AdapterAccount['type']>().notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: varchar('refresh_token', { length: 255 }),
    access_token: varchar('access_token', { length: 255 }),
    expires_at: int('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: varchar('id_token', { length: 2048 }),
    session_state: varchar('session_state', { length: 255 })
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index('userId_idx').on(account.userId)
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] })
}));

export const sessions = mysqlTable(
  'session',
  {
    sessionToken: varchar('sessionToken', { length: 255 }).notNull().primaryKey(),
    userId: varchar('userId', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull()
  },
  (session) => ({
    userIdIdx: index('userId_idx').on(session.userId)
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] })
}));

export const verificationTokens = mysqlTable(
  'verificationToken',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull()
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token)
  })
);
