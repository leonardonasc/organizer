import { auth } from "@/auth";
import { NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/tests",
  "/wishlists",
  "/travels",
  "/annotations",
  "/expenses",
  "/upgrade",
];

const authPages = ["/login", "/register"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = Boolean(req.auth);

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthPage = authPages.includes(pathname);

  if (!isLoggedIn && isProtectedRoute) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tests/:path*",
    "/wishlists/:path*",
    "/travels/:path*",
    "/annotations/:path*",
    "/expenses/:path*",
    "/upgrade/:path*",
    "/getstarted/:path*",
    "/login",
    "/register",
  ],
};
