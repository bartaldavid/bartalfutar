import { PGPASSWORD } from '$env/static/private';
import postgres from 'postgres';

export const sql = postgres({
  host: 'db.sdhyrcdacommsndlyjue.supabase.co',
  database: 'postgres',
  user: 'postgres',
  port: 5432,
  password: PGPASSWORD
});
