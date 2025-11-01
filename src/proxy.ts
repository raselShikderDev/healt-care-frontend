import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {

    const token = request.cookies.get("accessToken")?.value

    const {pathname} = request.nextUrl

    const protectedRoute = ["/dashboard/*",  ]

    const authRoutes = ["/login", "/signup", "/forget-password"]

    const isProtectedPath = protectedRoute.some((path)=>{
        pathname.startsWith(path)
    })

    const isAuthRoutes = authRoutes.some((path)=>{
        pathname.startsWith(path)
    })


    if (isProtectedPath && !token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }
    if (isAuthRoutes && token) {
        return NextResponse.redirect(new URL("/", request.url))
    }


  return NextResponse.redirect(new URL('/home', request.url))
}
 
export const config = {
  matcher: ['/dashboard/*', "/login", "/signup", "/forget-password"]
}