import { NextResponse, NextRequest } from 'next/server'


type UserRole = "PATIENT" | "DOCTOR" | "ADMIN"

type RouteConfig ={
  exact:string[]
  patterns:RegExp[]
}

const authRoutes = ["/login", "/signup", "/forget-password", "/reset-password"];

const commonProtectedRoutes:RouteConfig ={
  exact:["/my-profile", "/settings"],
  patterns:[], // [/password/change-password, /password/reser-password => /password/*]
}

const doctorPatientsroutes:RouteConfig = {
  patterns:[/^\doctor/], // Routes stating with /doctor/*, /assitence
  exact:[] // "/assistence"
}

const adminProtectedRoutes:RouteConfig={
  patterns:[/^\/admin/],
  exact:[]
}

const patientProtectedRoutes:RouteConfig={
  patterns:[/^\/dashboard/],
  exact:[]
}

 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  console.log(request.nextUrl.pathname);
  
  return NextResponse.next()
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
   
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
  ],
}







// import { NextResponse, NextRequest } from "next/server";
// import { jwtDecode } from "jwt-decode";
// import { IUser } from "./types/types";



// const roleBasedRoutes = {
//   DOCTOR: ["/doctor/dashboard"],
//   ADMIN: ["/admin/dashboard"],
//   PATIENT: ["/patient/dashboard",
//     "/patient/appointments",
//     "/patient/medical-records",
//   ],
// };



// export async function proxy(request: NextRequest) {
//   const accessToken = request.cookies.get("accessToken")?.value;
//   const refreshToken = request.cookies.get("refreshToken")?.value;

//   const { pathname } = request.nextUrl;

//   if (!accessToken && !refreshToken && !authRoutes.includes(pathname)) {
//     return NextResponse.redirect(
//       new URL(`/login?redirect=${pathname}`, request.url)
//     );
//   }

//   let user: IUser | null = null;

//   if (accessToken) {
//     try {
//       user = jwtDecode(accessToken); 
//     } catch (error) {
//       console.log(error);
//       return NextResponse.redirect(
//         new URL(`/login?redirect=${pathname}`, request.url)
//       );
//     }
//   }

//   if (!user && refreshToken) {
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//         }
//       );
//       const data = await res.json();

//       if (data.success) {
//         const newAccessToken = request.cookies.get("accessToken")?.value;
//         user = jwtDecode(newAccessToken as string);
//         return NextResponse.next();
//       } else {
//         const response = NextResponse.redirect(
//           new URL(`/login?redirect=${pathname}`, request.url)
//         );
//         response.cookies.delete("refreshToken");
//         response.cookies.delete("accessToken");
//         return response;
//       }
//     } catch (error) {
//       console.error(error);
//       const response = NextResponse.redirect(
//         new URL(`login?redirect=${pathname}`, request.url)
//       );
//       response.cookies.delete("refreshToken");
//       response.cookies.delete("accessToken");
//       return response;
//     }
//   }

//   if (user) {
//     const allowedroutes = user ? roleBasedRoutes[user.role] : [];

//     if (
//       allowedroutes &&
//       allowedroutes.some((path) => pathname.startsWith(path))
//     ) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }

//   if (user && authRoutes.includes(pathname)) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/dashboard", "/login", "/signup", "/forget-password"],
// };


// // import { NextResponse } from "next/server";
// // import type { NextRequest } from "next/server";
// // import { jwtDecode } from "jwt-decode";

// // interface userInterface {
// //   id: number;
// //   email: string;
// //   role: "ADMIN" | "DOCTOR" | "PATIENT";
// //   exp: number;
// //   ia: number;
// // }

// // const roleBasedRoutes = {
// //   ADMIN: ["/admin/dashboard",],
// //   DOCTOR: ["/doctor/dashboard"],
// //   PATIENT: [
// //     "/patient/dashboard",
// //     "/patient/appointments",
// //     "/patient/medical-records",
// //   ],
// // };

// // const authRoutes = ["/login", "/register", "/forgot-password"];

// // export async function proxy(request: NextRequest) {
// //   const accessToken = request.cookies.get("accessToken")?.value;
// //   const refreshToken = request.cookies.get("refreshToken")?.value;

// //   const { pathname } = request.nextUrl;

// //   if (!accessToken && !refreshToken && !authRoutes.includes(pathname)) {
// //     return NextResponse.redirect(
// //       new URL(`/login?redirect=${pathname}`, request.url)
// //     );
// //   }

// //   let user: userInterface | null = null;

// //   if (accessToken) {
// //     try {
// //       user = jwtDecode(accessToken); // {id: string, email: string, role: "ADMIN"| "DOCTOR" | "PATIENT", exp: number, iat: number}
// //     } catch (err) {
// //       console.log("Error decoding access token:", err);
// //       return NextResponse.redirect(
// //         new URL(`/login?redirect=${pathname}`, request.url)
// //       );
// //     }
// //   }

// //   if (!user && refreshToken) {
// //     try {
// //       const refreshRes = await fetch(
// //         `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({ refreshToken }),
// //         }
// //       );
// //       if (refreshRes.ok) {
// //         const newAccessToken = request.cookies.get("accessToken")?.value;
// //         user = jwtDecode(newAccessToken!);
// //         return NextResponse.next();
// //       } else {
// //         const response = NextResponse.redirect(
// //           new URL(`/login?redirect=${pathname}`, request.url)
// //         );
// //         response.cookies.delete("accessToken");
// //         response.cookies.delete("refreshToken");
// //         return response;
// //       }
// //     } catch (err) {
// //       console.log("Error refreshing token:", err);
// //       const response = NextResponse.redirect(
// //         new URL(`/login?redirect=${pathname}`, request.url)
// //       );
// //       response.cookies.delete("accessToken");
// //       response.cookies.delete("refreshToken");
// //       return response;
// //     }
// //   }


// //    if(user){
// //     const allowedRoutes = user ? roleBasedRoutes[user.role] : [];
// //     if(allowedRoutes && allowedRoutes.some((r)=>pathname.startsWith(r))){
// //         return NextResponse.next();
// //     }else{
// //         return NextResponse.redirect(new URL(`/unauthorized`, request.url));
// //     }
// //    }

// //    if(user && authRoutes.includes(pathname)){
// //     return NextResponse.redirect(new URL(`/`));
// //    }
   


// //   return NextResponse.next();
// // }

// // // See "Matching Paths" below to learn more
// // export const config = {
// //   matcher: ["/admin/dashboard/:path*", "/login", "/register", "/forgot-password"],
// // };