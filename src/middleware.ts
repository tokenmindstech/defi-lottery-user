import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the session cookie manually
  const sessionToken =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  const isAuthPage = pathname.startsWith("/auth");
  const hasSession = !!sessionToken;

  // User has no session and is NOT on auth page => redirect to auth
  if (!hasSession && !isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // User has no session and is on auth page => continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - /auth/* (auth pages)
     * - /_next/* (Next.js internals)
     * - /api/* (API routes)
     * - /static/* (static files)
     * - .*\.(.*)$ (files with extensions like favicon.ico etc.)
     */
    "/((?!auth|_next|api|static|.*\\..*$).*)",
  ],
};
