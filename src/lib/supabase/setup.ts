import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { Database } from './supabase';
import type { savedStop } from '$lib/stores/favorite-stops';

const supabase = createClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export async function saveStopToSupabase(stop: savedStop) {
  if (!stop.id) return;
  const { error, data } = await supabase
    .from('stops')
    .insert({
      stop_id: stop.id,
      direction: stop.direction,
      name: stop.name,
      route_ids: stop.routeIds,
      lat: stop.lat,
      lon: stop.lon,
      reference: stop.routeRef,
      type: stop.type,
      parent_station_id: stop.parentStationId,
      description: stop.description
    })
    .select();
  if (error) console.error(error);
  console.log(data);
}
