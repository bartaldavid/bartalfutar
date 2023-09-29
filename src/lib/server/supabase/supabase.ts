export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      favorite_stops: {
        Row: {
          created_at: string;
          id: number;
          stop_id: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          stop_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          stop_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'favorite_stops_stop_id_fkey';
            columns: ['stop_id'];
            referencedRelation: 'stops';
            referencedColumns: ['stop_id'];
          },
          {
            foreignKeyName: 'favorite_stops_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      stops: {
        Row: {
          description: string | null;
          direction: string | null;
          lat: number | null;
          lon: number | null;
          name: string | null;
          parent_station_id: string | null;
          reference: Json | null;
          route_ids: string[] | null;
          stop_id: string;
          type: string | null;
        };
        Insert: {
          description?: string | null;
          direction?: string | null;
          lat?: number | null;
          lon?: number | null;
          name?: string | null;
          parent_station_id?: string | null;
          reference?: Json | null;
          route_ids?: string[] | null;
          stop_id: string;
          type?: string | null;
        };
        Update: {
          description?: string | null;
          direction?: string | null;
          lat?: number | null;
          lon?: number | null;
          name?: string | null;
          parent_station_id?: string | null;
          reference?: Json | null;
          route_ids?: string[] | null;
          stop_id?: string;
          type?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
