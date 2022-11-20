import z from "zod";

export const createLinkSchema = z.object({
  slug: z
    .string()
    .min(6, "Min slug length is 6 chars")
    .max(64, "Max slug length is 64 chars.")
    .regex(/^[A-Za-z0-9-_]+$/, "Use URL-friendly symbols (A-Za-z0-9-_)."),
  url: z.string().url("Not a valid URL"),
  description: z.string().max(500, "Max length is 500 chars."),
});

export const getSingleLinkSchema = z.object({
  id: z.string().cuid(),
});
// CURSOR-BASED pagination
export const getInfiniteLinkSchema = z.object({
  limit: z
    .number()
    .min(1, "Min take length is 1.")
    .max(20, "Max take length is 20.")
    .nullish(),
  cursor: z.string().nullish(),
  filter: z.string().optional(),
  orderBy: z.object({ updatedAt: z.enum(["asc", "desc"]) }),
});

export const updateLinkSchema = z.object({
  id: z.string().cuid(),
  update: createLinkSchema,
});

export const deleteLinkSchema = z.object({
  id: z.string().cuid(),
});

export type GetInfiniteLinkInput = z.TypeOf<typeof getInfiniteLinkSchema>;

export type CreateLinkInput = z.TypeOf<typeof createLinkSchema>;

export type UpdateLinkInput = z.TypeOf<typeof updateLinkSchema>;
