import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export default {
  schema: './src/lib/server/libsql-schema.ts',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DB_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN as string
  },
  out: './drizzle-orm/libsql',
  dialect: 'sqlite'
} satisfies Config;
