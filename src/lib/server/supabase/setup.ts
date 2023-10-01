import { createClient } from '@supabase/supabase-js';
import { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import type { Database } from './supabase';
import type { components } from '$lib/data/bkk-openapi';

const supabase = createClient<Database>(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function saveStopToSupabase({
  stop,
  routeReference
}: {
  stop: components['schemas']['TransitStop'];
  routeReference: { [key: string]: components['schemas']['TransitRoute'] | undefined };
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

  return { routeError, routeStatus, stopError, stopStatus };
}

export async function getStopsFromSupabase() {
  const { data: stops, error } = await supabase.from('stops_with_routes').select('*');
  return { stops, error };
}
