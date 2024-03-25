import { z } from 'zod';
import { publicProcedure, router } from './server';

export const appRouter = router({
  sayHello: publicProcedure.input(z.string()).query(async ({ input }) => {
    return `Hi, ${input}!`;
  })
});

export type AppRouter = typeof appRouter;
