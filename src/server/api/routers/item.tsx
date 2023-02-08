/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const itemRouter = createTRPCRouter({
  postMessage: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx,input }) => {
      try {
        await ctx.prisma.item.create({
          data: {
            name: input.name,
            description: input.description,
            userId: input.userId
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});