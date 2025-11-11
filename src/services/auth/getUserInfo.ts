"use server";

import { IUserInfo } from "@/types/user.interface";
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "../../lib/tokenHandler";

export const getUserInfo = async (): Promise<IUserInfo | null> => {
  try {

    const accessToken = await getCookie("accessToken")

    if (!accessToken) {
      return null
    }

    const verifiedToken: JwtPayload | any = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string
    ) as JwtPayload;

    if (!verifiedToken) {
      return null
    }

    const userInfo:IUserInfo ={
      name:verifiedToken.name || "Unknown user",
      email: verifiedToken.email,
      role:verifiedToken.role
    }
    
    return userInfo
  } catch (error) {
    console.log(error);
    return null
  }

};
