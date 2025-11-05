import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    const res = NextResponse.redirect(new URL("/login", request.url))
    res.cookies.delete("refreshToken")
    res.cookies.delete("accessToken")
    return res
}