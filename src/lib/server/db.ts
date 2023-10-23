import { PLANETSCALE_URL } from '$env/static/private';
import { connect } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import * as schema from './schema';

const connection = connect({
  url: PLANETSCALE_URL
});

export const db = drizzle(connection, { schema });
