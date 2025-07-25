import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the session cookie manually
  const sessionToken =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  // Check if we're on the auth page
  const isAuthPage = pathname.startsWith("/auth");
  const hasSession = !!sessionToken;

  // Extract ref parameter
  const searchParams = request.nextUrl.searchParams;
  const ref = searchParams.get("ref");
  const isExistRef = request.cookies.get("ref")?.value;

  // Handle auth logic
  if (isAuthPage) {
    return handleReferral(request);
  }

  // Auth protection logic for non-auth pages
  if (!hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";

    // Include ref parameter in the redirect URL if it exists
    if (ref) {
      url.searchParams.set("ref", ref);
    } else if (isExistRef) {
      // If ref is in cookie but not in URL, add it to URL
      url.searchParams.set("ref", isExistRef);
    } else {
      url.search = ""; // Clear search params only if no ref to preserve
    }

    const redirectResponse = NextResponse.redirect(url);

    // If there's a referral code and no existing ref cookie, set it even during redirect
    if (!isExistRef && ref) {
      redirectResponse.cookies.set("ref", ref, { maxAge: 60 * 60 }); // 1 hour in seconds
    }

    return redirectResponse;
  }

  // User has session and is on protected page
  return handleReferral(request);
}

// Helper function to handle referral parameters
function handleReferral(request: NextRequest): NextResponse {
  const searchParams = request.nextUrl.searchParams;
  const ref = searchParams.get("ref");
  const isExistRef = request.cookies.get("ref")?.value;

  if (!isExistRef && ref) {
    // Set the cookie with the ref value
    const response = NextResponse.next();
    response.cookies.set("ref", ref, { maxAge: 60 * 5 }); // 5 minutes in seconds
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Auth pages - for referral processing
    "/auth",
    "/auth/:path*",

    // Protected pages that require authentication
    "/((?!auth|_next|api|static|.*\\..*$).*)",
  ],
};
