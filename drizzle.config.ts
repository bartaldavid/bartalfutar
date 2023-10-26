import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export default {
  schema: './src/lib/server/schema.ts',
  driver: 'mysql2',
  dbCredentials: {
    connectionString: process.env.PLANETSCALE_URL as string
  },
  out: './drizzle-orm/'
} satisfies Config;
