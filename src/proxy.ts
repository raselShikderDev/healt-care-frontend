import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

type UserRole = "PATIENT" | "DOCTOR" | "ADMIN";

type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

const authRoutes = ["/login", "/signup", "/forget-password", "/reset-password"];

const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/settings"],
  patterns: [], // [/password/change-password, /password/reser-password => /password/*]
};

const doctorPatientsroutes: RouteConfig = {
  patterns: [/^\/doctor/], // Routes stating with /doctor/*, /assitence
  exact: [], // "/assistence"
};

const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin/],
  exact: [],
};

const patientProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard/],
  exact: [],
};

const isAuthRoute = (pathName: string) => {
  return authRoutes.some((route) => route === pathName);
};

const isRouteMatches = (pathName: string, routes: RouteConfig): boolean => {
  if (routes.exact.includes(pathName)) {
    return true;
  }
  return routes.patterns.some((pattern: RegExp) => pattern.test(pathName));
};

const getRouteOwner = (
  pathName: string
): "ADMIN" | "DOCTOR" | "PATIENT" | "COMMON" | null => {
  if (isRouteMatches(pathName, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isRouteMatches(pathName, patientProtectedRoutes)) {
    return "PATIENT";
  }
  if (isRouteMatches(pathName, doctorPatientsroutes)) {
    return "DOCTOR";
  }
  if (isRouteMatches(pathName, commonProtectedRoutes)) {
    return "COMMON";
  }
  return null;
};

const getDefaultDashboard = (role: UserRole): string => {
  if (role === "ADMIN") {
    return "/admin/dashboard";
  }
  if (role === "DOCTOR") {
    return "/doctor/dashboard";
  }
  if (role === "PATIENT") {
    return "/dashboard";
  }
  return "/";
};

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookieStore = await cookies();

  const accessToken = request.cookies.get("accessToken")?.value || null;
  // console.log({ accessToken });

  let userRole: UserRole | null = null;
  if (accessToken) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const verifiedToken: JwtPayload | any = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string
    );

    // console.log({ verifiedToken });

    if (typeof verifiedToken === "string") {
      NextResponse.redirect(new URL("/login", request.url));
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
    }
    userRole = verifiedToken.role;
  }
  // console.log(userRole);
  console.log({ pathname });

  const routeOwner = getRouteOwner(pathname);
  console.log({ routeOwner });

  const isAuth = isAuthRoute(pathname);
  console.log({ isAuth });

  // Rule 1: user is logged in but trying to access auth routes => redirecting to default dashboard
  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboard(userRole as UserRole), request.url)
    );
  }

  // Rule 2: If user trying to acces public route
  if (userRole === null) {
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
    console.log({ "userRole !== routeOwner": userRole !== routeOwner });

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
