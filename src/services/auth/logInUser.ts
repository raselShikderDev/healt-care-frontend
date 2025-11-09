/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import z from "zod";
import { parse } from "cookie";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  getDefaultDashboard,
  isValidRedirectRoute,
  UserRole,
} from "@/lib/authUtils";
import { setCookie } from "@/lib/tokenHandler";

const logInUserSchema = z.object({
  email: z.email({ error: "Email is required" }),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, { error: "Password must be at least 8 character" })
    .max(30, { error: "Password must be at most 30 character" }),
});

export const logInUser = async (_currentState: any, formData: any) => {
  const redirectTo = formData.get("redirect");
  console.log(`Redirect from ${redirectTo}`);

  let accessTokenObject: null | any = null;
  let refreshTokenObject: null | any = null;
  const signInData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validatedFeild = logInUserSchema.safeParse(signInData);

  if (!validatedFeild.success) {
    return {
      success: false,
      errors: validatedFeild.error.issues.map((issue) => {
        return {
          feild: issue.path[0],
          message: issue.message,
        };
      }),
    };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFeild.data),
      credentials: "include",
    });
    const data = res.json();

    const setCookieHeader = res.headers.getSetCookie();

    if (setCookieHeader && setCookieHeader.length > 0) {
      setCookieHeader.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);

        if (parsedCookie["accessToken"]) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie["refreshToken"]) {
          refreshTokenObject = parsedCookie;
        }
      });
    } else {
      throw new Error("No set cookies found");
    }

    if (!accessTokenObject) {
      throw new Error("No accessToken found");
    }

    if (!refreshTokenObject) {
      throw new Error("No refreshToken found");
    }


    await setCookie("accessToken", accessTokenObject.accessToken, {
      httpOnly: true,
      secure: true,
      path: accessTokenObject.path || "/",
      maxAge: Number(accessTokenObject["maxAge"]) || 1000 * 60 * 60,
      sameSite: accessTokenObject["sameSite"] || "none",
      // expires:accessTokenObject.Expires,
    });
    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      httpOnly: true,
      secure: true,
      path: refreshTokenObject.path || "/",
      maxAge: Number(refreshTokenObject["maxAge"]) || 1000 * 60 * 60 * 24 * 30,
      sameSite: refreshTokenObject["sameSite"] || "none",
      // expires:refreshTokenObject.Expires,
    });

    console.log(data);

    let userRole: UserRole | null = null;
    const verifiedToken: JwtPayload | any = jwt.verify(
      accessTokenObject.accessToken,
      process.env.JWT_ACCESS_SECRET as string
    );

    if (typeof verifiedToken === "string") {
      throw new Error("Invalid token");
    }
    userRole = verifiedToken.role;

    if (redirectTo) {
      const requestedPath = redirectTo.toString();
      if (isValidRedirectRoute(requestedPath, userRole as UserRole)) {
        redirect(requestedPath);
      } else {
        redirect(getDefaultDashboard(userRole as UserRole));
      }
    } else {
      redirect(getDefaultDashboard(userRole as UserRole));
    }

  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.error(error);
    return { error: "Login failed" };
  }
};
