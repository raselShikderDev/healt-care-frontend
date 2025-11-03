import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode"


interface IUser {
  id: number;
  email: string;
  role: "ADMIN" | "DOCTROR" | "PATIENT";
  exp: number;
  ia: number;
}

const roleBasedRoutes = {
  DOCTOR:["/doctor/dashboard/*"],
  ADMIN:[
    "/admin/dashaboard",
    "/admin/manage-doctors",
    "/admin/manage-patients",
  ],
  PATIENT:[
    "/patient/dashaboard",
    "/patient/manage-doctors",
    "/patient/manage-patients",
  ],
}


const authRoutes = ["/login", "/signup", "/forget-password"];
// const protectedRoute = ["/dashboard/*", "dashboard"];

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // console.log("token", token);

  const { pathname } = request.nextUrl;


  if (!accessToken && !refreshToken && !authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(`login?redirect=${pathname}`, request.url))
  }


  let user: IUser | null = null

  if (accessToken) {
    try {
      user = jwtDecode(accessToken) // {id:number, }
      console.log(user);

    } catch (error) {
      console.log(error);
      return NextResponse.redirect(new URL(`login?redirect=${pathname}`, request.url))
    }
  }

  if (user && refreshToken) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      console.log("[in proxy.ts] res: ", res);
      const data = await res.json();
      console.log("[in proxy.ts] data: ", data);

      if (data.success) {
        const newAccessToken = request.cookies.get("accessToken")?.value;
        user = jwtDecode(newAccessToken as string)
        return NextResponse.next()
      } else {
        const response = NextResponse.redirect(new URL(`login?redirect=${pathname}`, request.url))
        response.cookies.delete("refreshToken")
        response.cookies.delete("accessToken")
        return response
      }

    } catch (error) {
      console.error(error);
      const response = NextResponse.redirect(new URL(`login?redirect=${pathname}`, request.url))
      response.cookies.delete("refreshToken")
      response.cookies.delete("accessToken")
      return response
    }
  }



  // const isProtectedPath = protectedRoute.some((path) => {
  //   pathname.startsWith(path);
  // });
  // // console.log("isProtectedPath", isProtectedPath);

  // const isAuthRoutes = authRoutes.some((path) => pathname === path);
  // // console.log("isAuthRoutes", isAuthRoutes);

  // if (isProtectedPath && !accessToken) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // if (isAuthRoutes && accessToken) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  // console.log(`pathname.startsWith("/dashboard"): ${pathname.startsWith("/dashboard")}`);

  // if (pathname.startsWith("/dashboard") && !accessToken) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup", "/forget-password"],
};
