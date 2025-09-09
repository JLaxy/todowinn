import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/projects", "/tasks"];

export function middleware(req: NextRequest) {
  // Extract token on cookie
  const token = req.cookies.get("token")?.value;

  // Check if user is trying to access non-protected route
  if (!protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route)))
    // Then continue request
    return NextResponse.next();

  // If there is no token, go back to login
  if (!token) return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/projects/:path*", "/tasks/:path*"],
};
