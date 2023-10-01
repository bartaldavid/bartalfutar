export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      favorite_stops: {
        Row: {
          created_at: string
          id: number
          stop_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          stop_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          stop_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favorite_stops_stop_id_fkey"
            columns: ["stop_id"]
            referencedRelation: "stops"
            referencedColumns: ["stop_id"]
          },
          {
            foreignKeyName: "favorite_stops_stop_id_fkey"
            columns: ["stop_id"]
            referencedRelation: "stops_with_routes"
            referencedColumns: ["stop_id"]
          },
          {
            foreignKeyName: "favorite_stops_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      stops: {
        Row: {
          code: string | null
          description: string | null
          direction: string | null
          lat: number | null
          location_type: number | null
          lon: number | null
          name: string | null
          parent_station_id: string | null
          route_ids: string[] | null
          stop_id: string
          style: Json | null
          type: string | null
          vertex: string | null
          wheelchair_boarding: boolean | null
        }
        Insert: {
          code?: string | null
          description?: string | null
          direction?: string | null
          lat?: number | null
          location_type?: number | null
          lon?: number | null
          name?: string | null
          parent_station_id?: string | null
          route_ids?: string[] | null
          stop_id: string
          style?: Json | null
          type?: string | null
          vertex?: string | null
          wheelchair_boarding?: boolean | null
        }
        Update: {
          code?: string | null
          description?: string | null
          direction?: string | null
          lat?: number | null
          location_type?: number | null
          lon?: number | null
          name?: string | null
          parent_station_id?: string | null
          route_ids?: string[] | null
          stop_id?: string
          style?: Json | null
          type?: string | null
          vertex?: string | null
          wheelchair_boarding?: boolean | null
        }
        Relationships: []
      }
      transit_routes: {
        Row: {
          agency_id: string | null
          bikes_allowed: boolean | null
          color: string | null
          description: string | null
          icon_display_text: string | null
          icon_display_type: string | null
          id: string
          long_name: string | null
          short_name: string | null
          sort_order: number | null
          style: Json | null
          text_color: string | null
          type: string | null
          url: string | null
        }
        Insert: {
          agency_id?: string | null
          bikes_allowed?: boolean | null
          color?: string | null
          description?: string | null
          icon_display_text?: string | null
          icon_display_type?: string | null
          id: string
          long_name?: string | null
          short_name?: string | null
          sort_order?: number | null
          style?: Json | null
          text_color?: string | null
          type?: string | null
          url?: string | null
        }
        Update: {
          agency_id?: string | null
          bikes_allowed?: boolean | null
          color?: string | null
          description?: string | null
          icon_display_text?: string | null
          icon_display_type?: string | null
          id?: string
          long_name?: string | null
          short_name?: string | null
          sort_order?: number | null
          style?: Json | null
          text_color?: string | null
          type?: string | null
          url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      stops_with_routes: {
        Row: {
          direction: string | null
          jsonb_object_agg: Json | null
          location_type: number | null
          name: string | null
          stop_id: string | null
          type: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
