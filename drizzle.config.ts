import type { Config } from 'drizzle-kit';

export default {
  schema: './src/lib/schemas/*',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL
  },
  out: './src/lib/orm'
} satisfies Config;
