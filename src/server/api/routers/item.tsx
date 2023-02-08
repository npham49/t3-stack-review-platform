/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const itemRouter = createTRPCRouter({
  postMessage: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const uId = await ctx.prisma.account.findFirst({
          where: {
            providerAccountId: ctx.session.user.id,
          },
          select: {
            id: true,
          },
        })|| {id: ''};
        console.log(uId.id);
        if (uId.id==='') {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "User not found",
          })
        }
        await ctx.prisma.item.create({
          data: {
            name: input.name,
            description: input.description,
            userId: uId.id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  getAllItems: publicProcedure.query(async ({ ctx }) => {
    try {
      const items = await ctx.prisma.item.findMany({
        select: {
          name: true,
          userId: true,
          description: true,
          updatedAt: true,
          createdAt: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return items;
    } catch (error) {
      console.log(error);
    }
  }),
});
