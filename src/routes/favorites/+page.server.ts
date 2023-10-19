import { favoriteStops, stops } from '$lib/schemas/user-data.js';
import { db } from '$lib/server/db.js';
import { eq } from 'drizzle-orm';

// FIXME casting type to an enum here is not legit
type Stop = {
  id: string;
  type?:
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
  name?: string;
  locationType?: number;
};

export async function load({ parent }) {
  const { session } = await parent();
  const userId = session?.user.id;

  if (!userId) {
    return { stops: [] as Stop[] };
  }

  const result = await db
    .select({
      id: stops.id,
      type: stops.type,
      name: stops.name,
      locationType: stops.locationType
    })
    .from(stops)
    .innerJoin(favoriteStops, eq(stops.id, favoriteStops.stopId))
    .where(eq(favoriteStops.userId, userId))
    .execute();

  return { stops: result };
}
