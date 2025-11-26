/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { getCookie } from "@/lib/tokenHandler";
import { UserInfo } from "@/types/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getUserInfo = async (): Promise<UserInfo | any> => {
  let userInfo: UserInfo | any;
  try {
    const response = await serverFetch.get("/auth/me", {
      cache: "force-cache",
      next: { tags: ["user-info"] },
    });

    const result = await response.json();
    // console.log({ result });

    if (result.success) {
      const accessToken = await getCookie("accessToken");
      // console.log({
      //   "In getUserInfo 22 line accessToken ": accessToken,
      //   "In getUserInfo 22 line JWT acces secret ": process.env
      //     .JWT_ACCESS_SECRET as string,
      // });

      if (!accessToken) {
        throw new Error("No access token found");
      }

      const verifiedToken = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      ) as JwtPayload;

      userInfo = {
        name: verifiedToken.name || "Unknown User",
        email: verifiedToken.email,
        role: verifiedToken.role,
      };
    }

    userInfo = {
      name:
        result.data?.admin?.name ||
        result.data?.doctor?.name ||
        result.data?.patient?.name ||
        result.data?.name ||
        "Unknown User",
      ...result.data,
    };

    // console.log({ userInfo });
    return userInfo;
  } catch (error: any) {
    console.log(error);
    return {
      id: "",
      name: "Unknown User",
      email: "",
      role: "PATIENT",
    };
  }
};
