import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

export default async function getUrl(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query["slug"];

  console.log(slug);

  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "please use with a slug" }));
    return;
  }

  const data = await prisma.shortLink.findFirst({
    where: { slug: { equals: slug } },
  });

  if (!data) {
    res.statusCode = 404;

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=2592000, stale-while-revalidate");

    res.send(JSON.stringify({ message: "slug not found" }));
    return;
  }

  return res.json(data);
}
