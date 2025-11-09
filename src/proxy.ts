import { NextResponse, NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getDefaultDashboard, getRouteOwner, isAuthRoute, UserRole } from "./lib/authUtils";
import { deleteCookie } from "./lib/tokenHandler";


export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const accessToken = request.cookies.get("accessToken")?.value || null;

  let userRole: UserRole | null = null;
  if (accessToken) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const verifiedToken: JwtPayload | any = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string
    );


    if (typeof verifiedToken === "string") {
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }
    userRole = verifiedToken.role;
  }

  const routeOwner = getRouteOwner(pathname);

  const isAuth = isAuthRoute(pathname);

  // Rule 1: user is logged in but trying to access auth routes => redirecting to default dashboard
  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboard(userRole as UserRole), request.url)
    );
  }

  // Rule 2: If user trying to acces public route
  if (routeOwner === null) {
    return NextResponse.next();
  }

  // Rule 1 & 2 is open for public routes
  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }
  // Rule 3: if use trying to acces common protected routes
  if (routeOwner === "COMMON") {
    return NextResponse.next();
  }

  // Rule 4: if user try to acces role based routes

  if (
    routeOwner === "ADMIN" ||
    routeOwner === "DOCTOR" ||
    routeOwner === "PATIENT"
  ) {
    if (userRole !== routeOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboard(userRole as UserRole), request.url)
      );
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */

    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
