import { sql } from '$lib/server/db.js';

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

export async function load({ locals }) {
  const session = await locals.getSession();
  const userId = session?.user.id;

  if (!userId) {
    return { stops: [] as Stop[] };
  }

  const stops = await sql<Stop[]>`
    SELECT 
      stops.stop_id id, 
      type, 
      stops.name, 
      location_type as "locationType"
    FROM stops
    JOIN favorite_stops ON stops.stop_id = favorite_stops.stop_id
    WHERE favorite_stops.user_id = ${userId}`;

  console.log(stops, userId);
  return { stops };
}
