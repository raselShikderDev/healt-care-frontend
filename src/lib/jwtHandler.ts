"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from "jsonwebtoken";

export const getUser = (accessToken: string) => {
  const verifiedToken: JwtPayload | any = jwt.verify(
    accessToken,
    process.env.JWT_ACCESS_SECRET as string
  );
  return verifiedToken
};
