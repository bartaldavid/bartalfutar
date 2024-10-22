import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './libsql-schema';
import { TURSO_AUTH_TOKEN, TURSO_DB_URL } from '$env/static/private';

const turso = createClient({
  url: TURSO_DB_URL,
  authToken: TURSO_AUTH_TOKEN,
});

export const db = drizzle({ schema, client: turso });
