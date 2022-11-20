import { router, protectedProcedure } from "../trpc";
import {
  createLinkSchema,
  getSingleLinkSchema,
  getInfiniteLinkSchema,
  updateLinkSchema,
  deleteLinkSchema,
} from "../../../schema/link.schema";

export const linkRouter = router({
  create: protectedProcedure
    .input(createLinkSchema)
    .mutation(async ({ ctx, input }) => {
      const link = await ctx.prisma.shortLink.create({
        data: {
          ...input,
          createdBy: {
            connect: { id: ctx.session.user.id },
          },
        },
      });
      return link;
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userLinks = await ctx.prisma.shortLink.findMany({
      where: {
        creatorId: ctx.session.user.id,
      },
    });
    return userLinks;
  }),
  // CURSOR-BASED
  getInfinite: protectedProcedure
    .input(getInfiniteLinkSchema)
    .query(async ({ ctx, input }) => {
      const limit = input.limit || 5;
      const { cursor, filter, orderBy } = input;
      const items = await ctx.prisma.shortLink.findMany({
        take: limit + 1, // extra item is for next cursor
        where: {
          creatorId: ctx.session.user.id,
          OR: [
            {
              url: { contains: filter },
            },
            {
              slug: { contains: filter },
            },
            {
              description: { contains: filter },
            },
          ],
        },
        orderBy,
        cursor: cursor ? { id: cursor } : undefined,
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }

      return {
        items,
        nextCursor,
      };
    }),
  getOne: protectedProcedure
    .input(getSingleLinkSchema)
    .query(async ({ ctx, input }) => {
      const link = await ctx.prisma.shortLink.findFirst({
        where: {
          id: input.id,
          creatorId: ctx.session.user.id,
        },
      });
      return link;
    }),
  update: protectedProcedure
    .input(updateLinkSchema)
    .mutation(async ({ ctx, input }) => {
      const link = await ctx.prisma.shortLink.update({
        where: {
          id: input.id,
          creatorId: ctx.session.user.id,
        },
        data: { ...input.update },
      });
      return link;
    }),
  delete: protectedProcedure
    .input(deleteLinkSchema)
    .mutation(async ({ ctx, input }) => {
      const deletedLink = await ctx.prisma.shortLink.delete({
        where: {
          id: input.id,
          creatorId: ctx.session.user.id,
        },
      });
      return deletedLink;
    }),
});
