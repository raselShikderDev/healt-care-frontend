export type UserRole = "PATIENT" | "DOCTOR" | "ADMIN";

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export const authRoutes = ["/login", "/signup", "/forget-password", "/reset-password"];

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/settings", "/change-password"],
  patterns: [], // [/password/change-password, /password/reset-password => /password/*]
};

export const doctorPatientsroutes: RouteConfig = {
  patterns: [/^\/doctor/], // Routes stating with /doctor/*, /assitence
  exact: [], // "/assistence"
};

export const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin/],
  exact: [],
};

export const patientProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard/],
  exact: [],
};

export const isAuthRoute = (pathName: string) => {
  return authRoutes.some((route) => route === pathName);
};

export const isRouteMatches = (pathName: string, routes: RouteConfig): boolean => {
  if (routes.exact.includes(pathName)) {
    return true;
  }
  return routes.patterns.some((pattern: RegExp) => pattern.test(pathName));
};

export const getRouteOwner = (
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

export const getDefaultDashboard = (role: UserRole): string => {
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


export const isValidRedirectRoute = (redirectPath:string, role:UserRole):boolean=>{
   const routeOwner = getRouteOwner(redirectPath)
   if (routeOwner === null || routeOwner === "COMMON") {
    return true
   }

   if (routeOwner === role) {
    return true
   }
   return false
}