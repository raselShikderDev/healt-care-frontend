"use server";

import { deleteCookie } from "@/lib/tokenHandler";
import { redirect } from "next/navigation";

export const logOutUser = async () => {
 await deleteCookie("accessToken")
 await deleteCookie("refreshToken")

 redirect("/login?logout=true")
};

