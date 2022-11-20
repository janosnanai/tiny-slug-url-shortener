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
  // OFFSET-BASED seems like trpc query dont accept it...
  // getInfinite: protectedProcedure
  //   .input(getInfiniteLinkSchema)
  //   .query(async ({ ctx, input }) => {
  //     const { page, take } = input;
  //     const skip = (page - 1) * take;
  //     const userLinks = await ctx.prisma.shortLink.findMany({
  //       where: {
  //         creatorId: ctx.session.user.id,
  //       },
  //       skip,
  //       take,
  //     });
  //     const userLinkCount = await ctx.prisma.shortLink.count({
  //       where: {
  //         creatorId: ctx.session.user.id,
  //       },
  //     });
  //     const pageCount = Math.ceil(userLinkCount / take);
  //     const prevPage = page > 1 ? page - 1 : null;
  //     const nextPage = page < pageCount ? page + 1 : null;
  //     return {
  //       userLinks,
  //       pages: {
  //         count: pageCount,
  //         prev: prevPage,
  //         current: page,
  //         next: nextPage,
  //       },
  //     };
  //   }),

  // CURSOR-BASED
  getInfinite: protectedProcedure
    .input(getInfiniteLinkSchema)
    .query(async ({ ctx, input }) => {
      const limit = input.limit || 5;
      const { cursor } = input;
      const items = await ctx.prisma.shortLink.findMany({
        take: limit + 1, // extra item is for next cursor
        where: {
          creatorId: ctx.session.user.id,
        },
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
