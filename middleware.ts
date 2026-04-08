import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getPostAuthRedirect, LEGACY_AUTH_DASHBOARD_PATH } from "@/lib/auth/redirect";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === LEGACY_AUTH_DASHBOARD_PATH) {
    const destination = getPostAuthRedirect(LEGACY_AUTH_DASHBOARD_PATH);
    const url = request.nextUrl.clone();
    url.pathname = destination;
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/workspace/:path*", "/profile/:path*", "/auth/dashboard"]
};
