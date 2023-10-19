import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
 
neonConfig.fetchConnectionCache = true;

// TODO add neon string
const sql = neon("");
export const db = drizzle(sql);
 
