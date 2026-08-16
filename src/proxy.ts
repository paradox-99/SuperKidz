import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPrefixes = ["/profile", "/checkout", "/orders", "/admin"];
const adminOnlyPrefixes = ["/admin"];
const authOnlyRoutes = ["/signin", "/signup"];

const matchesPrefix = (pathname: string, prefixes: string[]) =>
      prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

const setSecurityHeaders = (response: NextResponse) => {
      response.headers.set("X-Frame-Options", "DENY");
      response.headers.set("X-Content-Type-Options", "nosniff");
      response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
      response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
      response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains");
      return response;
};

export default async function proxy(request: NextRequest) {
      const { pathname, search } = request.nextUrl;

      const isProtectedRoute = matchesPrefix(pathname, protectedPrefixes);
      const isAuthOnlyRoute = matchesPrefix(pathname, authOnlyRoutes);

      if (isProtectedRoute || isAuthOnlyRoute) {
            const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

            if (isProtectedRoute && !token) {
                  const signInUrl = new URL("/signin", request.url);
                  signInUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
                  return setSecurityHeaders(NextResponse.redirect(signInUrl));
            }

            if (token && matchesPrefix(pathname, adminOnlyPrefixes) && token.role !== "admin") {
                  return setSecurityHeaders(NextResponse.redirect(new URL("/", request.url)));
            }

            if (isAuthOnlyRoute && token) {
                  return setSecurityHeaders(NextResponse.redirect(new URL("/", request.url)));
            }
      }

      return setSecurityHeaders(NextResponse.next());
}

export const config = {
      matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|.*\\.(?:png|jpg|jpeg|svg|webp|ico)$).*)"],
};
