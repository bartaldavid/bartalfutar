import { PGCONNECTIONURL } from '$env/static/private';
import postgres from 'postgres';

export const sql = postgres(PGCONNECTIONURL);

// import { NEON_URL } from '$env/static/private';
// import { neon } from '@neondatabase/serverless';
// const sql = neon(NEON_URL);

// export default sql;
