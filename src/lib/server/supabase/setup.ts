import { createClient } from '@supabase/supabase-js';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import type { Database } from './supabase';
import type { components } from '$lib/data/bkk-openapi';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';

const supabase = createClient<Database>(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function saveStopToSupabase({
  stop,
  routeReference,
  userId
}: {
  stop: components['schemas']['TransitStop'];
  routeReference: { [key: string]: components['schemas']['TransitRoute'] | undefined };
  userId: string;
}) {
  if (!stop.id) return;

  const { error: stopError, status: stopStatus } = await supabase.from('stops').upsert({
    stop_id: stop.id,
    direction: stop.direction,
    name: stop.name,
    route_ids: stop.routeIds,
    lat: stop.lat,
    lon: stop.lon,
    type: stop.type,
    parent_station_id: stop.parentStationId,
    description: stop.description,
    location_type: stop.locationType,
    code: stop.code,
    style: stop.style,
    vertex: stop.vertex,
    wheelchair_boarding: stop.wheelchairBoarding
  });

  const routesArray = Object.entries(routeReference)
    .filter((item) => !!item[1])
    .map(([key, value]) => {
      // fix this
      if (!value) throw Error('No route found');
      return {
        id: key,
        agency_id: value.agencyId,
        short_name: value.shortName,
        long_name: value.longName,
        description: value.description,
        type: value.type,
        url: value.url,
        color: value.color,
        text_color: value.textColor,
        sort_order: value.sortOrder,
        bikes_allowed: value.bikesAllowed,
        icon_display_text: value.iconDisplayText,
        icon_display_type: value.iconDisplayType,
        style: value.style
      };
    });

  const { error: routeError, status: routeStatus } = await supabase
    .from('transit_routes')
    .upsert(routesArray);

  const { error: favoriteError, status: favoriteStatus } = await supabase
    .from('favorite_stops')
    .upsert({ created_at: new Date().toISOString(), stop_id: stop.id, user_id: userId });

  return { routeError, routeStatus, stopError, stopStatus, favoriteError, favoriteStatus };
}

// export async function getStopsFromSupabase(userId: string) {
//   const { data: stops, error } = await supabase
//     .from('favorite_stops')
//     .select(`*, stops ( * )`)
//     .eq('favorite_stops.user_id', userId);
//   return { stops, error };
// }
