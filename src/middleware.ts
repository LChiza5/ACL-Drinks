import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith("/dashboard")) {
      if (!token || (token.role !== "ADMIN" && token.role !== "MANAGER")) {
        return NextResponse.redirect(new URL("/login?from=dashboard", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const pathname = req.nextUrl.pathname;

        const publicPaths = [
          "/",
          "/products",
          "/categories",
          "/kits",
          "/offers",
          "/tracking",
          "/login",
          "/register",
        ];

        const isPublic = publicPaths.some(
          (p) => pathname === p || pathname.startsWith(p + "/")
        );
        const isPublicApi =
          pathname.startsWith("/api/products") ||
          pathname.startsWith("/api/categories") ||
          pathname.startsWith("/api/kits") ||
          pathname.startsWith("/api/tracking");

        if (isPublic || isPublicApi) return true;

        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/orders/:path*",
    "/checkout/:path*",
    "/api/orders/:path*",
    "/api/users/:path*",
  ],
};
