/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { parse } from "cookie";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  getDefaultDashboard,
  isValidRedirectRoute,
  UserRole,
} from "@/lib/authUtils";
import { setCookie } from "@/lib/tokenHandler";
import { serverFetch } from "@/lib/serverFetch";
import { zodValidator } from "@/lib/zodValidator";
import { loginValidationZodSchema } from "@/zod/auth.validation";

export const logInUser = async (_currentState: any, formData: any) => {
  const redirectTo = formData.get("redirect");
  console.log(`Redirect from ${redirectTo}`);

  let accessTokenObject: null | any = null;
  let refreshTokenObject: null | any = null;
  const signInData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  if (zodValidator(signInData, loginValidationZodSchema).success === false) {
    return zodValidator(signInData, loginValidationZodSchema);
  }

  const validatedData = zodValidator(signInData, loginValidationZodSchema).data;

  try {
    const res = await serverFetch.post(`/auth/login`, {
      body: JSON.stringify(validatedData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log({ data });

    const setCookieHeader = res.headers.getSetCookie();
    console.log({ setCookieHeader });

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
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
      sameSite: accessTokenObject["SameSite"] || "none",
      // expires:accessTokenObject.Expires,
    });
    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      httpOnly: true,
      secure: true,
      path: refreshTokenObject.path || "/",
      maxAge:
        parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 30,
      sameSite: refreshTokenObject["SameSite"] || "none",
      // expires:refreshTokenObject.Expires,
    });

    let userRole: UserRole | null = null;
    const verifiedToken: JwtPayload | any = jwt.verify(
      accessTokenObject.accessToken,
      process.env.JWT_ACCESS_SECRET as string
    );

    if (typeof verifiedToken === "string") {
      throw new Error("Invalid token");
    }
    userRole = verifiedToken.role;

    if (!data.success) {
      throw new Error(data.message || "Login failed");
    }

    if (redirectTo && data.data.needPasswordChange) {
      const requestedPath = redirectTo.toString();
      if (isValidRedirectRoute(requestedPath, userRole as UserRole)) {
        redirect(`/reset-password?redirect=${requestedPath}`);
      } else {
        redirect(`/reset-password`);
      }
    }

    if (data.data.needPasswordChange) {
      redirect("/reset-password");
    }

    if (redirectTo) {
      const requestedPath = redirectTo.toString();
      if (isValidRedirectRoute(requestedPath, userRole as UserRole)) {
        redirect(`${requestedPath}?loggedIn=true`);
      } else {
        redirect(`${getDefaultDashboard(userRole as UserRole)}?loggedIn=true`);
      }
    } else {
      redirect(`${getDefaultDashboard(userRole as UserRole)}?loggedIn=true`);
    }
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.error(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to login! you might have entered wrong credentials"
      }`,
    };
  }
};
