import { router, protectedProcedure } from "../trpc";
import {
  createLinkSchema,
  getSingleLinkSchema,
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
      where: { creatorId: ctx.session.user.id },
    });
    return userLinks;
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
