import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

// redirecter middleware
export async function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/s/")) {
    return;
  }

  const slug = req.nextUrl.pathname.split("/s/").pop();

  const data = await (
    await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)
  ).json();

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }

  console.log("data?", data);
}
