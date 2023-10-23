import { createInsertSchema } from 'drizzle-zod';
import { stops } from './schema';

export const insertStopSchema = createInsertSchema(stops);
