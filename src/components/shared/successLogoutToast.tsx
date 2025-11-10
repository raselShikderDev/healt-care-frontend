"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const SuccessLogoutToast = () => {
  const searchParams = useSearchParams();
  const router = useRouter()

  useEffect(() => {
    console.log();
    if (searchParams.get("logout") === "true") {
      toast.success("You have been successfully Logout");
    }

    const newUrl = new URL(window.location.href)
    newUrl.searchParams.delete("logout")
    router.replace(newUrl.toString())

  }, [searchParams, router]);
  return null
};

export default SuccessLogoutToast;
