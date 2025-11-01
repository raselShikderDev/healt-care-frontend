import { NextResponse, NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  console.log("token", token);

  const { pathname } = request.nextUrl;

  const protectedRoute = ["/dashboard/*", "dashboard"];

  const authRoutes = ["/login", "/signup", "/forget-password"];

  const isProtectedPath = protectedRoute.some((path) => {
    pathname.startsWith(path);
  });
  console.log("isProtectedPath", isProtectedPath);

  const isAuthRoutes = authRoutes.some((path) => pathname === path);
  console.log("isAuthRoutes", isAuthRoutes);

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoutes && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  console.log(`pathname.startsWith("/dashboard"): ${pathname.startsWith("/dashboard")}`);
  
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup", "/forget-password"],
};
