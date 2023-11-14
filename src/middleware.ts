import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

const LOGIN_PATH = "/login";
// these are paths that require authentication but not a specific role
const protectedPaths = ["/account"];
// these are only accessible to buyers
const buyerPaths = ["/purchases"];
// these are only accessible to sellers
const sellerPaths = ["/products", "/orders"];

export default async function middleware(req: NextRequest) {
  // redirect to login if not authenticated on protected pages
  const session = await getToken({ req });

  const email = session?.user?.email;
  const role = session?.user?.role;
  const pathname = req.nextUrl.pathname;

  // TODO: this is a hacky way to do this, but it works for now.
  if (!email || !role) {
    for (const path of protectedPaths) {
      if (pathname.startsWith(path)) {
        return NextResponse.redirect(new URL(LOGIN_PATH, req.nextUrl));
      }
    }
  }

  if (role === "buyer") {
    for (const path of sellerPaths) {
      if (pathname.startsWith(path)) {
        return NextResponse.redirect(new URL(LOGIN_PATH, req.nextUrl));
      }
    }
  }

  if (role === "seller") {
    for (const path of buyerPaths) {
      if (pathname.startsWith(path)) {
        return NextResponse.redirect(new URL(LOGIN_PATH, req.nextUrl));
      }
    }
  }

  return NextResponse.next();
}
